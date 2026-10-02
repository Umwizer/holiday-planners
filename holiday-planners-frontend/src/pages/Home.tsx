import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      position: "relative", height: "75vh", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {images.map((img, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === current ? 1 : 0,
          transition: "opacity 1.5s ease-in-out"
        }} />
      ))}

      <h1 style={{
        position: "relative", zIndex: 1,
        color: "#fff", fontFamily: "Georgia, serif",
        fontSize: "3.5rem", textAlign: "center",
        maxWidth: "900px", lineHeight: 1.3, textShadow: "0 2px 12px rgba(0,0,0,0.4)"
      }}>
        Enjoy The Travel With<br />
        <span style={{
          background: "#c19a5b", padding: "0.3rem 1rem",
          display: "inline-block", marginTop: "1rem"
        }}>
          Holiday Planners
        </span>
      </h1>
    </section>
  );
}