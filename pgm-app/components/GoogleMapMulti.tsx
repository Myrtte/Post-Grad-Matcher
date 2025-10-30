"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

type ListingDoc = {
  id: string;
  title: string;
  name?: string;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  availableRooms: number;
  availableBathrooms: number;
  description?: string;
  createdAt?: unknown;
  lat?: number;
  lng?: number;
};

type Props = {
  listings: ListingDoc[];
  queryText: string;
  selectedId?: string | null;
  onSelectId?: (id: string | null) => void;
};

const containerStyle = { width: "100%", height: "100%" };

export default function GoogleMapMulti({ listings, queryText, selectedId: controlledSelectedId, onSelectId }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"] as any,
    id: "pgm-google-maps-loader",
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userRecentered, setUserRecentered] = useState<boolean>(false);
  const [geocoded, setGeocoded] = useState<Record<string, { lat: number; lng: number }>>({});

  const markers = useMemo(() => {
    return listings
      .map((l) => {
        const coords =
          (typeof l.lat === "number" && typeof l.lng === "number")
            ? { lat: l.lat as number, lng: l.lng as number }
            : geocoded[l.id];
        if (!coords) return null;
        return {
          id: l.id,
          title: l.title,
          position: coords,
          subtitle: `${l.city}, ${l.state} ${l.zipcode}`,
        };
      })
      .filter(Boolean) as Array<{ id: string; title: string; position: google.maps.LatLngLiteral; subtitle: string }>;
  }, [listings, geocoded]);

  const fitToMarkers = useCallback(() => {
    if (!mapRef.current || markers.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((m) => bounds.extend(m.position));
    mapRef.current.fitBounds(bounds, 64);
  }, [markers]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!mapRef.current) return;
    if (userRecentered) return;
    fitToMarkers();
  }, [isLoaded, markers, fitToMarkers, userRecentered]);

  // When a controlled selectedId is provided, pan/zoom to that marker and open the info window
  useEffect(() => {
    if (!isLoaded) return;
    if (!mapRef.current) return;
    if (!controlledSelectedId) return;
    const m = markers.find((x) => x.id === controlledSelectedId);
    if (!m) return;
    mapRef.current.panTo(m.position);
    mapRef.current.setZoom(15);
    setSelectedId(controlledSelectedId);
  }, [isLoaded, controlledSelectedId, markers]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!mapRef.current) return;
    if (!queryText) return;

    const isUSA = queryText.trim().toUpperCase() === "USA";
    if (isUSA) {
      setUserRecentered(false);
      fitToMarkers();
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: queryText }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const res = results[0];
        const location = res.geometry.location;
        const bounds = res.geometry.bounds || res.geometry.viewport;
        if (bounds) {
          mapRef.current!.fitBounds(bounds, 64);
        } else if (location) {
          mapRef.current!.panTo({ lat: location.lat(), lng: location.lng() });
          mapRef.current!.setZoom(12);
        }
        setUserRecentered(true);
      }
    });
  }, [isLoaded, queryText, fitToMarkers]);

  useEffect(() => {
    if (!isLoaded) return;
    if (typeof window === "undefined" || !(window as any).google) return;
    const geocoder = new google.maps.Geocoder();

    const toGeocode = listings.filter((l) => typeof l.lat !== "number" || typeof l.lng !== "number");
    if (toGeocode.length === 0) return;

    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < toGeocode.length; i++) {
        if (cancelled) break;
        const l = toGeocode[i];
        const address = `${l.address}, ${l.city}, ${l.state} ${l.zipcode}`;

        await new Promise<void>((resolve) => setTimeout(resolve, 200));

        geocoder.geocode({ address }, async (results, status) => {
          if (status === "OK" && results && results[0]) {
            const loc = results[0].geometry.location;
            const coords = { lat: loc.lat(), lng: loc.lng() };
            setGeocoded((prev) => ({ ...prev, [l.id]: coords }));

            try {
              if (db) {
                await updateDoc(doc(db, "listings", l.id), {
                  lat: coords.lat,
                  lng: coords.lng,
                });
              }
            } catch (e) {
            }
          }
        });
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, listings]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const center = useMemo<google.maps.LatLngLiteral>(() => ({ lat: 40.7128, lng: -74.006 }), []); // default NYC

  if (!isLoaded) {
    return <div className="w-full h-full" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={m.position}
          onClick={() => {
            setSelectedId(m.id);
            if (onSelectId) onSelectId(m.id);
          }}
        />
      ))}

      {selectedId && (
        (() => {
          const m = markers.find((x) => x.id === selectedId);
          if (!m) return null;
          return (
            <InfoWindow position={m.position} onCloseClick={() => setSelectedId(null)}>
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-gray-600">{m.subtitle}</div>
              </div>
            </InfoWindow>
          );
        })()
      )}
    </GoogleMap>
  );
}


