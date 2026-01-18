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

        // Initialize map - simple flat view
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: zoom,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
            interactive: true,
        });

        // Add navigation controls
        map.current.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
            "top-right"
        );

        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

        // Create pulsing red dot marker
        const markerEl = document.createElement("div");
        markerEl.innerHTML = `
            <div class="pulse-marker" style="
                position: relative;
                width: 20px;
                height: 20px;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    background: #e53e3e;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    z-index: 2;
                "></div>
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    background: #e53e3e;
                    border-radius: 50%;
                    animation: pulse-ring 1.5s ease-out infinite;
                    z-index: 1;
                "></div>
            </div>
            <style>
                @keyframes pulse-ring {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(3);
                        opacity: 0;
                    }
                }
            </style>
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

        // Add marker at coordinates
        new mapboxgl.Marker({
            element: markerEl,
            anchor: "center"
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
