export default function MapEmbed({ query = "New York University" }) {
  const apiKey = "AIzaSyCwTbcMCOCEtS2RdH9voFy5UCeOeU6RgMw";

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`;

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