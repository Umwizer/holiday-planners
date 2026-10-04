import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUsers } from "react-icons/fa";
import { getTrips } from "../api";

type Trip = {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  discountPercent: number;
  durationDays: number;
  tripImages?: { imageCover: string; isCover: boolean }[];
};

export default function TrendingTours() {
  const [tours, setTours] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0);
  const visible = 3;

  useEffect(() => {
    getTrips()
      .then((data: Trip[]) => setTours(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxStart = Math.max(0, tours.length - visible);
  const prev = () => setStart(s => Math.max(0, s - 1));
  const next = () => setStart(s => Math.min(maxStart, s + 1));

  const getImage = (t: Trip) =>
    t.tripImages?.find(i => i.isCover)?.imageCover ??
    t.tripImages?.[0]?.imageCover ??
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800";

  const getCountry = (t: Trip) =>
    (t.destination || t.title || "").split(",")[0].trim().toUpperCase();

  return (
    <section className="trending-section" style={{
      background: "#f7f7f7",
      backgroundImage: "radial-gradient(#e5e5e5 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
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
              color: "#2b2b2b", lineHeight: 1.3,
              maxWidth: "560px", margin: 0,
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

        {loading && <p style={{ color: "#888" }}>Loading tours…</p>}
        {!loading && tours.length === 0 && (
          <p style={{ color: "#888" }}>No tours available yet.</p>
        )}

        {/* Cards */}
        {!loading && tours.length > 0 && (
          <>
            <div className="trending-grid">
              {tours.slice(start, start + visible).map(tour => (
                <article key={tour.id} className="trend-card">
                  {/* Image with overlays */}
                  <div className="trend-card-image-wrap">
                    <img
                      src={getImage(tour)}
                      alt={tour.title}
                      className="trend-card-image"
                    />

                    {/* Tilted % off ribbon */}
                    {tour.discountPercent > 0 && (
                      <div className="trend-card-discount">
                        {tour.discountPercent}% off
                      </div>
                    )}

                    {/* Country badge bottom-left */}
                    <div className="trend-card-country">
                      {getCountry(tour)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="trend-card-body">
                    <h3 className="trend-card-title">{tour.title}</h3>
                    <p className="trend-card-desc">{tour.description}</p>

                    {/* Meta row */}
                    <div className="trend-card-meta">
                      <div className="trend-meta-item">
                        <FaClock className="trend-meta-icon" />
                        <div>
                          <div className="trend-meta-label">Duration</div>
                          <div className="trend-meta-value">
                            {tour.durationDays} days
                          </div>
                        </div>
                      </div>
                      <div className="trend-meta-item">
                        <FaUsers className="trend-meta-icon" />
                        <div>
                          <div className="trend-meta-label">Group Size</div>
                          <div className="trend-meta-value">15+ People</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="trend-card-bottom">
                      <span className="trend-card-price">${tour.price}</span>
                      <Link to={`/trips/${tour.id}`} className="btn-gold trend-card-btn">
                        BOOK NOW
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Dots */}
            <div className="trend-dots">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStart(i)}
                  className={`trend-dot ${i === start ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}