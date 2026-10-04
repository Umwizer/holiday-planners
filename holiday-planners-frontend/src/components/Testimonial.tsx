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

const FALLBACK: Testimonial[] = [
  {
    id: "f1",
    customerName: "Mathew A. Stephenson",
    rating: 5,
    quote:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    source: "Rated by travelers on Twitter",
  },
  {
    id: "f2",
    customerName: "Minh Chau",
    rating: 5,
    quote:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    source: "Rated by travelers on Instagram",
  },
  {
    id: "f3",
    customerName: "John Doe",
    rating: 5,
    quote:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    source: "Rated by travelers on Facebook",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) { /* keep fallback */ }
    }, 55000);

    getTestimonials()
      .then((data: Testimonial[]) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {
        // keep fallback
      })
      .finally(() => {
        if (!cancelled) clearTimeout(timer);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;

  const t = items[current];

  return (
    <section className="testimonials-wrap">
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

      <div className="testimonials-right" style={{
        background: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "center",
        boxShadow: "0 5px 30px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {Array.from({ length: t.rating || 5 }).map((_, i) => (
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
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show review ${i + 1}`}
              style={{
                width: "12px", height: "12px", borderRadius: "50%",
                border: "2px solid #c19a5b",
                background: i === current ? "#c19a5b" : "transparent",
                cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}