"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { getStoredAttribution, trackExternalLinkClick } from "@/lib/attribution";

type LatLngLiteral = {
    lat: number;
    lng: number;
};

type GoogleMapsListener = {
    remove: () => void;
};

type GoogleMapsApi = {
    maps: {
        event: {
            clearInstanceListeners: (instance: object) => void;
        };
        InfoWindow: new (options?: Record<string, unknown>) => {
            addListener: (eventName: string, handler: () => void) => GoogleMapsListener;
            close: () => void;
            open: (options: { anchor?: object; map?: object }) => void;
            setContent: (content: string) => void;
        };
        Map: new (element: HTMLElement, options: Record<string, unknown>) => {
            setCenter: (center: LatLngLiteral) => void;
            setZoom: (zoom: number) => void;
        };
        Marker: new (options: Record<string, unknown>) => {
            addListener: (eventName: string, handler: () => void) => GoogleMapsListener;
            setMap: (map: object | null) => void;
            setPosition: (position: LatLngLiteral) => void;
        };
        Point: new (x: number, y: number) => unknown;
        Size: new (width: number, height: number) => unknown;
    };
};

declare global {
    interface Window {
        google?: GoogleMapsApi;
    }
}

export interface MapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    className?: string;
    markerTitle?: string;
    markerDescription?: string;
}

const GOOGLE_MAPS_SCRIPT_ID = "galeo-google-maps-script";
const MARKER_ICON_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 28 16 28s16-18 16-28c0-8.837-7.163-16-16-16z" fill="#2d3436"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>`
)}`;

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

function loadGoogleMapsApi(apiKey: string) {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("Google Maps can only load in the browser."));
    }

    if (window.google?.maps) {
        return Promise.resolve(window.google);
    }

    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
        const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;

        const handleLoad = () => {
            if (window.google?.maps) {
                resolve(window.google);
                return;
            }

            googleMapsPromise = null;
            reject(new Error("Google Maps loaded, but the API was unavailable."));
        };

        const handleError = () => {
            googleMapsPromise = null;
            reject(new Error("Failed to load Google Maps."));
        };

        if (existingScript) {
            existingScript.addEventListener("load", handleLoad, { once: true });
            existingScript.addEventListener("error", handleError, { once: true });
            return;
        }

        const script = document.createElement("script");
        script.id = GOOGLE_MAPS_SCRIPT_ID;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", handleLoad, { once: true });
        script.addEventListener("error", handleError, { once: true });
        document.head.appendChild(script);
    });

    return googleMapsPromise;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getInfoWindowContent({
    directionsLinkId,
    latitude,
    longitude,
    markerDescription,
    markerTitle,
}: {
    directionsLinkId: string;
    latitude: number;
    longitude: number;
    markerDescription: string;
    markerTitle: string;
}) {
    const encodedDestination = encodeURIComponent(`${latitude},${longitude}`);

    return `
        <div style="padding: 12px; font-family: system-ui, sans-serif; min-width: 180px;">
            <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${escapeHtml(markerTitle)}</h3>
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; line-height: 1.4;">${escapeHtml(markerDescription)}</p>
            <a
                id="${directionsLinkId}"
                href="https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display: inline-block;
                    padding: 6px 14px;
                    background: #c9a55c;
                    color: white;
                    text-decoration: none;
                    border-radius: 16px;
                    font-size: 11px;
                    font-weight: 600;
                "
            >Get Directions</a>
        </div>
    `;
}

export function Map({
    latitude,
    longitude,
    zoom = 16,
    className = "",
    markerTitle = "Galeo Beauty",
    markerDescription = "Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort",
}: MapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<InstanceType<GoogleMapsApi["maps"]["Map"]> | null>(null);
    const marker = useRef<InstanceType<GoogleMapsApi["maps"]["Marker"]> | null>(null);
    const infoWindow = useRef<InstanceType<GoogleMapsApi["maps"]["InfoWindow"]> | null>(null);
    const markerClickListener = useRef<GoogleMapsListener | null>(null);
    const infoWindowDomReadyListener = useRef<GoogleMapsListener | null>(null);
    const [googleMapsApi, setGoogleMapsApi] = useState<GoogleMapsApi | null>(null);
    const [scriptLoadError, setScriptLoadError] = useState<string | null>(null);
    const directionsLinkId = useId();
    const loadError = apiKey ? scriptLoadError : "Google Maps is not configured.";

    useEffect(() => {
        if (!apiKey) {
            console.warn(
                "Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file."
            );
            return;
        }

        let isActive = true;

        loadGoogleMapsApi(apiKey)
            .then((google) => {
                if (!isActive) {
                    return;
                }

                setGoogleMapsApi(google);
                setScriptLoadError(null);
            })
            .catch((error: unknown) => {
                if (!isActive) {
                    return;
                }

                const message = error instanceof Error ? error.message : "Unable to load Google Maps.";
                setScriptLoadError(message);
                console.error(message);
            });

        return () => {
            isActive = false;
        };
    }, [apiKey]);

    useEffect(() => {
        if (!googleMapsApi || !mapContainer.current || map.current) {
            return;
        }

        map.current = new googleMapsApi.maps.Map(mapContainer.current, {
            center: { lat: latitude, lng: longitude },
            clickableIcons: false,
            disableDefaultUI: true,
            fullscreenControl: true,
            gestureHandling: "cooperative",
            mapTypeControl: false,
            streetViewControl: false,
            zoom,
            zoomControl: true,
        });
    }, [googleMapsApi, latitude, longitude, zoom]);

    useEffect(() => {
        if (!googleMapsApi || !map.current) {
            return;
        }

        const position = { lat: latitude, lng: longitude };

        map.current.setCenter(position);
        map.current.setZoom(zoom);

        if (!marker.current) {
            marker.current = new googleMapsApi.maps.Marker({
                icon: {
                    anchor: new googleMapsApi.maps.Point(16, 44),
                    scaledSize: new googleMapsApi.maps.Size(32, 44),
                    url: MARKER_ICON_URL,
                },
                map: map.current,
                position,
                title: markerTitle,
            });
        } else {
            marker.current.setPosition(position);
        }

        if (!infoWindow.current) {
            infoWindow.current = new googleMapsApi.maps.InfoWindow();
        }

        infoWindow.current.setContent(
            getInfoWindowContent({
                directionsLinkId,
                latitude,
                longitude,
                markerDescription,
                markerTitle,
            })
        );

        markerClickListener.current?.remove();
        markerClickListener.current = marker.current.addListener("click", () => {
            infoWindow.current?.open({
                anchor: marker.current ?? undefined,
                map: map.current ?? undefined,
            });
        });

        infoWindowDomReadyListener.current?.remove();
        infoWindowDomReadyListener.current = infoWindow.current.addListener("domready", () => {
            const directionsLink = document.getElementById(directionsLinkId);

            if (!(directionsLink instanceof HTMLAnchorElement)) {
                return;
            }

            directionsLink.onclick = () => {
                trackExternalLinkClick({
                    attribution: getStoredAttribution(),
                    context: "map_popup_directions",
                    currentPage: window.location.pathname,
                    href: directionsLink.href,
                    linkLabel: "Map popup directions",
                    linkType: "maps",
                });
            };
        });
    }, [
        directionsLinkId,
        googleMapsApi,
        latitude,
        longitude,
        markerDescription,
        markerTitle,
        zoom,
    ]);

    useEffect(() => {
        return () => {
            markerClickListener.current?.remove();
            infoWindowDomReadyListener.current?.remove();
            infoWindow.current?.close();

            if (infoWindow.current && googleMapsApi) {
                googleMapsApi.maps.event.clearInstanceListeners(infoWindow.current);
            }

            if (marker.current && googleMapsApi) {
                googleMapsApi.maps.event.clearInstanceListeners(marker.current);
            }

            marker.current?.setMap(null);
            marker.current = null;
            infoWindow.current = null;
            map.current = null;
        };
    }, [googleMapsApi]);

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    return (
        <div className="relative h-full w-full">
            {loadError ? (
                <div
                    className={`flex h-full w-full items-center justify-center rounded-[inherit] bg-stone-100 px-6 text-center ${className}`}
                    style={{ minHeight: "400px" }}
                >
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                        The live map is unavailable right now. Use the directions button to open
                        Google Maps directly.
                    </p>
                </div>
            ) : (
                <div
                    ref={mapContainer}
                    className={`h-full w-full ${className}`}
                    style={{ minHeight: "400px" }}
                />
            )}
            <TrackedExternalLink
                href={directionsUrl}
                trackingContext="map_badge_directions"
                linkType="maps"
                linkLabel="Map directions"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gold/90"
            >
                <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span className="text-sm font-semibold">Get Directions</span>
            </TrackedExternalLink>
        </div>
    );
}
