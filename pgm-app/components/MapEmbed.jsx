export default function MapEmbed({ query = "USA" }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // When query is USA, show a view centered on the United States
  // Otherwise, search for the specific location
  const mapQuery = query === "USA" ? "United States" : query;
  
  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(mapQuery)}&zoom=${query === "USA" ? "4" : "12"}`;

  return (
    <div className="w-full h-full relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={src}
        className="opacity-90"
      ></iframe>
    </div>
  );
}