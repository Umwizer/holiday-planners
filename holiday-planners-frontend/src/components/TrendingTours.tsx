import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUsers } from "react-icons/fa";

type Tour = {
  id: number;
  country: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  price: number;
  discount?: number;
};

const tours: Tour[] = [
  {
    id: 1,
    country: "ITALY",
    title: "Holiday Planners is a World Leading Online Tour Booking Platform",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
    duration: "6 days 3 hours",
    groupSize: "15+ People",
    price: 2500,
  },
  {
    id: 2,
    country: "GREECE",
    title: "Holiday Planners is a World Leading Online Tour Booking Platform",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800",
    duration: "1 days 8 hours",
    groupSize: "50+ People",
    price: 750,
    discount: 15,
  },
  {
    id: 3,
    country: "JAISALMER",
    title: "Holiday Planners is a World Leading Online Tour Booking Platform",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
    duration: "7 days 8 hours",
    groupSize: "50+ People",
    price: 750,
    discount: 33,
  },
  {
    id: 4,
    country: "SWITZERLAND",
    title: "Holiday Planners is a World Leading Online Tour Booking Platform",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?w=800",
    duration: "7 days 8 hours",
    groupSize: "50+ People",
    price: 750,
    discount: 38,
  },
  {
    id: 5,
    country: "THAILAND",
    title: "Holiday Planners is a World Leading Online Tour Booking Platform",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
    duration: "5 days 4 hours",
    groupSize: "20+ People",
    price: 1200,
  },
];

export default function TrendingTours() {
  const [start, setStart] = useState(0);
  const visible = 3;
  const maxStart = Math.max(0, tours.length - visible);

  const prev = () => setStart(s => Math.max(0, s - 1));
  const next = () => setStart(s => Math.min(maxStart, s + 1));

  return (
    <section
      className="trending-section"
      style={{
        background: "#f7f7f7",
        backgroundImage: "radial-gradient(#e5e5e5 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header row */}
        <div className="trending-header">
          <div>
            <p style={{
              color: "#c19a5b", marginBottom: "0.8rem",
              borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
              fontSize: "0.95rem", fontWeight: 500,
            }}>
              Amazing Tours
            </p>
            <h2 className="section-title" style={{
              fontFamily: "Georgia, serif",
              color: "#2b2b2b", lineHeight: 1.3, maxWidth: "560px", margin: 0,
            }}>
              Trending, <strong>Best Selling Tours</strong> And Fun Destinations
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button onClick={prev} disabled={start === 0} className="btn-gold" style={{
              padding: "0.7rem 1.6rem", fontWeight: 600,
              opacity: start === 0 ? 0.5 : 1,
              cursor: start === 0 ? "not-allowed" : "pointer",
            }}>Prev</button>
            <button onClick={next} disabled={start >= maxStart} className="btn-gold" style={{
              padding: "0.7rem 1.6rem", fontWeight: 600,
              opacity: start >= maxStart ? 0.5 : 1,
              cursor: start >= maxStart ? "not-allowed" : "pointer",
            }}>Next</button>
          </div>
        </div>

        {/* Cards */}
        <div className="trending-grid" style={{ overflow: "hidden" }}>
          {tours.slice(start, start + visible).map(tour => (
            <article key={tour.id} style={{
              background: "#fff",
              boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
              overflow: "hidden", position: "relative",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                <img src={tour.image} alt={tour.country}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                {tour.discount && (
                  <div style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    background: "#c19a5b", color: "#fff",
                    padding: "0.4rem 0.7rem", fontSize: "0.8rem", fontWeight: 600,
                  }}>
                    {tour.discount}% off
                  </div>
                )}

                <div style={{
                  position: "absolute", bottom: "1rem", left: "1rem",
                  background: "#c19a5b", color: "#fff",
                  padding: "0.5rem 1.2rem", fontWeight: 700,
                  fontSize: "0.9rem", letterSpacing: "1px",
                }}>
                  {tour.country}
                </div>
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{
                  fontFamily: "Georgia, serif", fontSize: "1.15rem",
                  lineHeight: 1.4, color: "#2b2b2b", marginBottom: "0.8rem",
                }}>
                  {tour.title}
                </h3>
                <p style={{
                  color: "#777", fontSize: "0.88rem", lineHeight: 1.6,
                  marginBottom: "1.5rem", flex: 1,
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {tour.description}
                </p>

                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  borderTop: "1px solid #eee", borderBottom: "1px solid #eee",
                  padding: "1rem 0", marginBottom: "1rem", gap: "1rem",
                }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <FaClock style={{ color: "#c19a5b", fontSize: "1.1rem" }} />
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#888" }}>Duration</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2b2b2b" }}>
                        {tour.duration}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <FaUsers style={{ color: "#c19a5b", fontSize: "1.1rem" }} />
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#888" }}>Group Size</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2b2b2b" }}>
                        {tour.groupSize}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{
                    fontFamily: "Georgia, serif", fontSize: "1.5rem",
                    color: "#2b2b2b", fontWeight: 700,
                  }}>
                    ${tour.price}
                  </div>
                  <Link to={`/trips/${tour.id}`} className="btn-gold" style={{
                    padding: "0.7rem 1.5rem", textDecoration: "none",
                    fontWeight: 700, fontSize: "0.8rem", letterSpacing: "1px",
                  }}>
                    BOOK NOW
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: "0.6rem", marginTop: "2.5rem",
        }}>
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button key={i} onClick={() => setStart(i)} style={{
              width: "12px", height: "12px", borderRadius: "50%",
              border: "2px solid #c19a5b",
              background: i === start ? "#c19a5b" : "transparent",
              cursor: "pointer", padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}