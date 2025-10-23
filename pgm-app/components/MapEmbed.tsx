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
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Create a search query that includes the main location and all listing locations
  const allLocations = [query, ...listings.map(listing => listing.location)].filter(Boolean);
  const searchQuery = allLocations.join('|');

  const src = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={src}
      ></iframe>
    </div>
  );
}