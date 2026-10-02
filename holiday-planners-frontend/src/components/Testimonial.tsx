import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { getTestimonials } from "../api";

type Testimonial = {
  id: string;
  customerName: string;
  rating: number;
  quote: string;
  photoUrl?: string;
  source?: string;
};

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTestimonials()
      .then((data: Testimonial[]) => setItems(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (loading) return <p style={{ padding: "3rem", textAlign: "center" }}>Loading reviews…</p>;
  if (error) return <p style={{ padding: "3rem", textAlign: "center", color: "red" }}>{error}</p>;
  if (items.length === 0) return null;

  const t = items[current];

  return (
    <section style={{
      display: "grid", gridTemplateColumns: "1fr 1.6fr",
      maxWidth: "1200px", margin: "4rem auto",
      padding: "0 2rem", alignItems: "stretch", minHeight: "480px"
    }}>
      {/* Gold left panel */}
      <div style={{ position: "relative" }}>
        <div style={{
          background: "#c19a5b", color: "#fff", padding: "2.5rem 2rem",
          width: "100%"
        }}>
          <p style={{
            borderLeft: "3px solid #fff", paddingLeft: "0.8rem",
            fontSize: "0.95rem", marginBottom: "0.8rem", opacity: 0.95
          }}>
            Testimonials
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "2.4rem",
            margin: 0, lineHeight: 1.3
          }}>
            Customer Reviews
          </h2>
        </div>

        <div style={{
          background: "#fff", padding: "2rem",
          height: "calc(100% - 140px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 5px 30px rgba(0,0,0,0.06)"
        }}>
          <FaQuoteLeft style={{ fontSize: "10rem", color: "#c19a5b", opacity: 0.9 }} />
        </div>
      </div>

      {/* Right content */}
      <div style={{
        background: "#fff", padding: "3rem",
        display: "flex", flexDirection: "column", justifyContent: "center",
        boxShadow: "0 5px 30px rgba(0,0,0,0.06)"
      }}>
        {/* Photo (if exists) */}
        {t.photoUrl && (
          <img
            src={t.photoUrl}
            alt={t.customerName}
            style={{
              width: "60px", height: "60px", borderRadius: "50%",
              objectFit: "cover", marginBottom: "1rem"
            }}
          />
        )}

        {/* Stars */}
        <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
          {Array.from({ length: t.rating || 0 }).map((_, i) => (
            <FaStar key={i} style={{ color: "#c19a5b", fontSize: "1.2rem" }} />
          ))}
        </div>

        {/* Quote */}
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "1.15rem",
          lineHeight: 1.9, color: "#2b2b2b", marginBottom: "2rem"
        }}>
          {t.quote}
        </p>

        {/* Author */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: "1.3rem",
            color: "#c19a5b", margin: 0, fontWeight: 500
          }}>
            {t.customerName}
          </p>
          {t.source && (
            <p style={{ color: "#999", fontSize: "0.85rem", margin: "0.3rem 0 0" }}>
              {t.source}
            </p>
          )}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: "12px", height: "12px", borderRadius: "50%",
              border: "2px solid #c19a5b",
              background: i === current ? "#c19a5b" : "transparent",
              cursor: "pointer", padding: 0
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}