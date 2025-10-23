import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  contactInfo: string;
  createdAt: any;
}

interface MapEmbedProps {
  query?: string;
  listings?: Listing[];
}

export default function MapEmbed({ query = "New York University", listings = [] }: MapEmbedProps) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"]
      });

      try {
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker");
        const { Geocoder } = await loader.importLibrary("geocoding");

        // Initialize map
        const map = new Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
          zoom: 10,
        });

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for each listing
        const geocoder = new Geocoder();
        
        for (const listing of listings) {
          if (listing.location) {
            try {
              const results = await geocoder.geocode({ address: listing.location });
              if (results.results[0]) {
                const location = results.results[0].geometry.location;
                
                const marker = new Marker({
                  position: location,
                  map: map,
                  title: listing.title,
                  icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" fill="red" stroke="white" stroke-width="2"/>
                      </svg>
                    `),
                    scaledSize: new google.maps.Size(20, 20),
                    anchor: new google.maps.Point(10, 10)
                  }
                });

                // Add info window
                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div>
                      <h3>${listing.title}</h3>
                      <p>${listing.location}</p>
                      <p>$${listing.price}/mo</p>
                    </div>
                  `
                });

                marker.addListener("click", () => {
                  infoWindow.open(map, marker);
                });

                markersRef.current.push(marker);
              }
            } catch (error) {
              console.error(`Error geocoding ${listing.location}:`, error);
            }
          }
        }

        // If we have markers, fit the map to show all markers
        if (markersRef.current.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markersRef.current.forEach(marker => {
            bounds.extend(marker.getPosition());
          });
          map.fitBounds(bounds);
        } else {
          // If no listings, center on the search query
          try {
            const results = await geocoder.geocode({ address: query });
            if (results.results[0]) {
              map.setCenter(results.results[0].geometry.location);
              map.setZoom(10);
            }
          } catch (error) {
            console.error(`Error geocoding search query ${query}:`, error);
          }
        }

      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, [query, listings]);

  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
}