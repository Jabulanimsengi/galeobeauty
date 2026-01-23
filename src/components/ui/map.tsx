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

        // Initialize map - custom Galeo Beauty style
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/tsakanimsengi/cmkp36ijo001l01s54l2cgg4e",
            center: [longitude, latitude],
            zoom: 13,
            pitch: 0,
            bearing: 0,
            attributionControl: true,
            interactive: true,
        });

        // Add navigation controls
        map.current.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
            "top-right"
        );

        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

        // Create teardrop pin marker with white dot
        const markerEl = document.createElement("div");
        markerEl.innerHTML = `
            <div style="
                position: relative;
                width: 32px;
                height: 44px;
                cursor: pointer;
            ">
                <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Teardrop pin shape -->
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 28 16 28s16-18 16-28c0-8.837-7.163-16-16-16z" fill="#2d3436"/>
                    <!-- White inner dot -->
                    <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
            </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
            offset: 15,
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

        // Add marker at coordinates (anchor at bottom tip of pin)
        new mapboxgl.Marker({
            element: markerEl,
            anchor: "bottom"
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

    // Google Maps directions URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    return (
        <div className="relative w-full h-full">
            <div
                ref={mapContainer}
                className={`w-full h-full ${className}`}
                style={{ minHeight: "400px" }}
            />
            {/* Get Directions Badge */}
            <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-gold text-white px-5 py-3 rounded-lg shadow-xl hover:bg-gold/90 hover:scale-105 transition-all duration-300"
            >
                <svg
                    className="w-5 h-5 text-white"
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
                <span className="font-semibold text-sm">Get Directions</span>
            </a>
        </div>
    );
}
