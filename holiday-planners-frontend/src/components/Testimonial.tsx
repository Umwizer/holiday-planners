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
    let cancelled = false;

    const timer = setTimeout(() => {
      if (!cancelled) {
        setError("Backend is waking up — refresh in a minute.");
        setLoading(false);
      }
    }, 55000);

    getTestimonials()
      .then((data: Testimonial[]) => { if (!cancelled) setItems(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => {
        if (!cancelled) {
          clearTimeout(timer);
          setLoading(false);
        }
      });

    return () => { cancelled = true; clearTimeout(timer); };
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
    <section className="testimonials-wrap">
      {/* Gold left panel */}
      <div style={{ position: "relative" }}>
        <div style={{
          background: "#c19a5b", color: "#fff", padding: "2.5rem 2rem",
        }}>
          <p style={{
            borderLeft: "3px solid #fff", paddingLeft: "0.8rem",
            fontSize: "0.95rem", marginBottom: "0.8rem", opacity: 0.95,
          }}>
            Testimonials
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "2.4rem",
            margin: 0, lineHeight: 1.3,
          }}>
            Customer Reviews
          </h2>
        </div>

        <div className="testimonials-left-quote">
          <FaQuoteLeft className="testimonials-quote-icon" />
        </div>
      </div>

      {/* Right content */}
      <div className="testimonials-right" style={{
        background: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "center",
        boxShadow: "0 5px 30px rgba(0,0,0,0.06)",
      }}>
        {t.photoUrl && (
          <img
            src={t.photoUrl}
            alt={t.customerName}
            style={{
              width: "60px", height: "60px", borderRadius: "50%",
              objectFit: "cover", marginBottom: "1rem",
            }}
          />
        )}

        <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
          {Array.from({ length: t.rating || 0 }).map((_, i) => (
            <FaStar key={i} style={{ color: "#c19a5b", fontSize: "1.2rem" }} />
          ))}
        </div>

        <p style={{
          fontFamily: "Georgia, serif", fontSize: "1.15rem",
          lineHeight: 1.9, color: "#2b2b2b", marginBottom: "2rem",
        }}>
          {t.quote}
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: "1.3rem",
            color: "#c19a5b", margin: 0, fontWeight: 500,
          }}>
            {t.customerName}
          </p>
          {t.source && (
            <p style={{ color: "#999", fontSize: "0.85rem", margin: "0.3rem 0 0" }}>
              {t.source}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: "12px", height: "12px", borderRadius: "50%",
              border: "2px solid #c19a5b",
              background: i === current ? "#c19a5b" : "transparent",
              cursor: "pointer", padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}