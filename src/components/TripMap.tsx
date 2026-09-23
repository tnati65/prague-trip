"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapRoute } from "@/data/tripData";

const ROUTE_COLOR = "#e11d48";

function pinIcon(label: number): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:22px;height:22px;border-radius:9999px;
      background:${ROUTE_COLOR};color:white;
      font:600 11px/1 Heebo, Arial, sans-serif;
      box-shadow:0 1px 4px rgba(0,0,0,0.4);border:2px solid white;
    ">${label}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

/** ממרכז ומתאים את התצוגה כך שכל תחנות היום ייכנסו למסגרת, בכל פעם שהמסלול משתנה */
function FitRouteBounds({ coordinates }: { coordinates: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length === 0) return;
    if (coordinates.length === 1) {
      map.setView(coordinates[0], 13);
      return;
    }
    map.fitBounds(coordinates, { padding: [28, 28] });
  }, [map, coordinates]);

  return null;
}

export default function TripMap({ mapRoute }: { mapRoute: MapRoute }) {
  const { coordinates, totalKm, totalDuration } = mapRoute;

  const center = useMemo<[number, number]>(() => {
    if (coordinates.length === 0) return [50.0755, 14.4378];
    const lat = coordinates.reduce((sum, c) => sum + c[0], 0) / coordinates.length;
    const lon = coordinates.reduce((sum, c) => sum + c[1], 0) / coordinates.length;
    return [lat, lon];
  }, [coordinates]);

  return (
    <div
      dir="rtl"
      className="relative h-64 w-full overflow-hidden rounded-2xl border border-zinc-100 shadow-xs dark:border-zinc-800"
    >
      <MapContainer
        key={coordinates.map((c) => c.join(",")).join("|")}
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitRouteBounds coordinates={coordinates} />
        <Polyline positions={coordinates} pathOptions={{ color: ROUTE_COLOR, weight: 4 }} />
        {coordinates.map((position, i) => (
          <Marker key={i} position={position} icon={pinIcon(i + 1)} />
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 right-3 z-[1000]">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-md backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-100">
          <span>⚡ {totalKm} ק&quot;מ</span>
          <span className="text-zinc-300 dark:text-zinc-600">|</span>
          <span>⏱️ {totalDuration}</span>
        </span>
      </div>
    </div>
  );
}
