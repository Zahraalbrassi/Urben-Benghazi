"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from '@/context/ThemeContext';
import benghaziData from "@/data/benghazi.geo.json";

export default function InteractiveMap() {
  const { theme } = useTheme();
  const wrapperRef = useRef(null);
  const mapRef = useRef(null);
  const geoJsonLayersRef = useRef([]);
  const dotLayersRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const tileAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  // Benghazi (approx)
  const center = [32.1167, 20.0667];

  const locations = [
    { name: "Benghazi City Center", position: [32.1167, 20.0667] },
    { name: "Location 2", position: [32.1205, 20.0802] },
    { name: "Location 3", position: [32.1051, 20.0550] },
  ];
  const cityIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
        <div style="
          width: 14px;
          height: 14px;
          background: ${theme === "dark" ? "#60a5fa" : "#2563eb"};
          border: 2px solid white;
          border-radius: 999px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.35);
        "></div>
      `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
    [theme]
  );
  const geoJsonStyle = () => ({
    // Keep polygons subtle since we're using dots to indicate marked areas.
    color: theme === "dark" ? "#93c5fd" : "#1d4ed8",
    weight: 1,
    opacity: 0.55,
    fillColor: theme === "dark" ? "#2563eb" : "#3b82f6",
    fillOpacity: 0.12,
  });

  const markedAreaPoints = useMemo(() => {
    // Treat all GeoJSON features as "marked" for now.
    // If you later add a property like { marked: true }, we can filter here.
    const features = benghaziData?.features ?? [];

    const collectPairs = (coords, out) => {
      if (!Array.isArray(coords)) return;
      if (coords.length === 2 && typeof coords[0] === "number") {
        out.push(coords);
        return;
      }
      coords.forEach((c) => collectPairs(c, out));
    };

    const getFeatureCenter = (feature) => {
      const pairs = [];
      collectPairs(feature?.geometry?.coordinates, pairs);
      if (!pairs.length) return null;

      const bounds = L.latLngBounds(
        pairs.map(([lng, lat]) => L.latLng(lat, lng))
      );
      const center = bounds.getCenter();
      return [center.lat, center.lng];
    };

    return features
      .map((f) => ({
        name: f?.properties?.name ?? "Unnamed area",
        position: getFeatureCenter(f),
      }))
      .filter((p) => Array.isArray(p.position));
  }, [theme]);

  const pulseMarkedDots = () => {
    // Respect OS "Reduce Motion" setting.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const layers = dotLayersRef.current;
    if (!layers.length) return;

    layers.forEach((layer, idx) => {
      // Stagger the pulse so it feels intentional.
      const delay = idx * 90;
      window.setTimeout(() => {
        layer.setStyle({
          radius: 10,
          fillOpacity: 0.9,
          weight: 3,
        });

        window.setTimeout(() => {
          layer.setStyle({
            radius: 6,
            fillOpacity: 0.75,
            weight: 2,
          });
        }, 550);
      }, delay);
    });
  };

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;

        // Leaflet sometimes renders tiles "cut" if the map was mounted while off-screen.
        // Invalidate size once the map is actually visible.
        window.setTimeout(() => {
          mapRef.current?.invalidateSize?.();
        }, 0);

        pulseMarkedDots();
      },
      {
        // Trigger when ~35% of the map is visible.
        threshold: 0.35,
      }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <div
      ref={wrapperRef}
      className="h-[500px] w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
    >
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />

        {locations.map((loc) => (
          <Marker key={loc.name} position={loc.position} icon={cityIcon}>
            <Popup>
              <strong>{loc.name}</strong>
            </Popup>
          </Marker>
        ))}

        {/* Polygons (subtle) */}
        <GeoJSON
          data={benghaziData}
          style={geoJsonStyle}
          onEachFeature={(feature, layer) => {
            if (!geoJsonLayersRef.current.includes(layer)) {
              geoJsonLayersRef.current.push(layer);
            }

            const name = feature?.properties?.name ?? "Unnamed area";
            layer.bindPopup(
              `<div style="font-size:14px"><strong>${name}</strong></div>`
            );

            layer.on({
              mouseover: () => {
                layer.setStyle({
                  weight: 2,
                  fillOpacity: 0.2,
                  opacity: 0.8,
                });
              },
              mouseout: () => {
                layer.setStyle(geoJsonStyle());
              },
              click: () => {
                layer.openPopup();
              },
            });
          }}
        />

        {/* Dots (marked areas) */}
        {markedAreaPoints.map(({ name, position }) => (
          <CircleMarker
            key={name}
            center={position}
            radius={6}
            pathOptions={{
              color: theme === "dark" ? "#dbeafe" : "#ffffff",
              weight: 2,
              fillColor: theme === "dark" ? "#60a5fa" : "#2563eb",
              fillOpacity: 0.75,
            }}
            ref={(layer) => {
              if (!layer) return;
              if (!dotLayersRef.current.includes(layer)) {
                dotLayersRef.current.push(layer);
              }
            }}
          >
            <Popup>
              <strong>{name}</strong>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}