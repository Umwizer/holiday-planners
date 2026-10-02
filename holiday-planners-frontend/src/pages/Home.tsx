import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaFlag } from "react-icons/fa";

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero slideshow */}
      <section style={{
        position: "relative", height: "75vh", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {heroImages.map((img, i) => (
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

      {/* Search bar */}
      <section style={{
        background: "#fff", display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 1.5fr auto",
        gap: "1rem", maxWidth: "1150px",
        margin: "-55px auto 5rem", padding: "1.5rem",
        position: "relative", zIndex: 2,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaMapMarkerAlt style={{ color: "#c19a5b" }} />
          <input placeholder="Where To?" style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaCalendarAlt style={{ color: "#c19a5b" }} />
          <select style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none", background: "transparent" }}>
            <option>When?</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaFlag style={{ color: "#c19a5b" }} />
          <select style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none", background: "transparent" }}>
            <option>Travel Type</option>
          </select>
        </div>
        <button className="btn-gold" style={{ padding: "0.9rem 2rem", fontWeight: 700, letterSpacing: "1px" }}>
          FIND NOW
        </button>
      </section>

      {/* Plan Your Trip with Us */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
        maxWidth: "1200px", margin: "0 auto 6rem", padding: "0 2rem", alignItems: "center"
      }}>
        {/* Overlapping images */}
        <div style={{ position: "relative", height: "480px" }}>
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
            alt="Travel"
            style={{
              width: "70%", height: "80%", objectFit: "cover",
              border: "3px solid #c19a5b",
              position: "absolute", top: 0, right: 0
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
            alt="Traveler"
            style={{
              width: "55%", height: "55%", objectFit: "cover",
              border: "3px solid #c19a5b",
              position: "absolute", bottom: 0, left: 0,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
          />
        </div>

        {/* Text */}
        <div>
          <p style={{
            color: "#c19a5b", marginBottom: "0.8rem",
            borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
            fontSize: "0.95rem", fontWeight: 500
          }}>
            About us
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "2.6rem",
            marginBottom: "1.5rem", color: "#2b2b2b", lineHeight: 1.3
          }}>
            Plan Your Trip with Us
          </h2>
          <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "1rem" }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
            right at the coast of the Semantics, a large language ocean. A small river named
            Duden flows by their place and supplies it with the necessary regelialia.
          </p>
          <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "2rem" }}>
            It is a paradisematic country, in which roasted parts of sentences fly into your
            mouth. Even the all-powerful Pointing has no control about the blind texts it is
            an almost unorthographic.
          </p>
          <Link to="/about" className="btn-gold" style={{
            display: "inline-block", padding: "0.9rem 2rem",
            textDecoration: "none", fontWeight: 700, letterSpacing: "1px", fontSize: "0.85rem"
          }}>
            READ MORE
          </Link>
        </div>
      </section>
    </>
  );
}