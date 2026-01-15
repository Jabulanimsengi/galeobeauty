"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    className?: string;
    markerTitle?: string;
    markerDescription?: string;
}

export function Map({
    latitude,
    longitude,
    zoom = 16,
    className = "",
    markerTitle = "Galeo Beauty",
    markerDescription = "Shop 6, Landsmeer, Jan Smuts Rd, Hartbeespoort"
}: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        // Set the Mapbox access token
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

        if (!mapboxgl.accessToken) {
            console.warn("Mapbox token not found. Please set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file.");
            return;
        }

        // Initialize map - STATIC view (no animation, no tilt)
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [longitude, latitude],
            zoom: zoom,
            pitch: 0, // Flat view
            bearing: 0, // No rotation
            attributionControl: false,
            interactive: true, // Allow pan/zoom but no auto-animation
        });

        // Add navigation controls
        map.current.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
            "top-right"
        );

        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

        // Create simple static marker with gold styling
        const markerEl = document.createElement("div");
        markerEl.innerHTML = `
            <div style="
                width: 48px;
                height: 48px;
                background: linear-gradient(145deg, #d4af61 0%, #b8964a 50%, #9a7a3a 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 16px rgba(201, 165, 92, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2);
                border: 3px solid white;
                cursor: pointer;
            ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
            offset: 30,
            closeButton: true,
            closeOnClick: false,
        }).setHTML(`
            <div style="padding: 12px; font-family: system-ui, sans-serif; min-width: 180px;">
                <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${markerTitle}</h3>
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; line-height: 1.4;">${markerDescription}</p>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}"
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
        `);

        // Add marker at EXACT coordinates
        new mapboxgl.Marker({
            element: markerEl,
            anchor: "center" // Center of the marker element aligns with coordinates
        })
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map.current);

        // Cleanup
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [latitude, longitude, zoom, markerTitle, markerDescription]);

    return (
        <div
            ref={mapContainer}
            className={`w-full h-full ${className}`}
            style={{ minHeight: "400px" }}
        />
    );
}
