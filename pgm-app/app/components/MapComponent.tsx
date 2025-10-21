'use client'; // 👈 important for Next.js app router

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from '../fixLeafletIcon'; // import the fix
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  const listings = [
    { lat: 42.3601, lng: -71.0589, title: 'Roommate Listing 1', price: '$1200/mo' },
    { lat: 42.3625, lng: -71.0570, title: 'Roommate Listing 2', price: '$1300/mo' },
    { lat: 42.3582, lng: -71.0600, title: 'Roommate Listing 3', price: '$1100/mo' },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[42.3601, -71.0589]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {listings.map((listing, index) => (
          <Marker key={index} position={[listing.lat, listing.lng]}>
            <Popup>
              <b>{listing.title}</b>
              <br />
              {listing.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
