import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../api";

export default function Trips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrips()
      .then(data => setTrips(Array.isArray(data) ? data : data.content ?? []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
      <p style={{
        color: "#c19a5b", marginBottom: "0.8rem",
        borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
        fontSize: "0.95rem", fontWeight: 500
      }}>
        Our Tours
      </p>
      <h2 style={{
        fontFamily: "Georgia, serif", fontSize: "2.6rem",
        marginBottom: "3rem", color: "#2b2b2b"
      }}>
        All Available <strong>Trips</strong>
      </h2>

      {loading && <p>Loading trips…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && trips.length === 0 && <p>No trips yet.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2rem"
      }}>
        {trips.map((t: any) => {
          const id = t.id ?? t.tripId;
          const title = t.title ?? t.name ?? t.destination ?? "Untitled Trip";
          const image = t.imageUrl ?? t.image ?? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800";
          const price = t.price ?? t.cost;
          const desc = t.description ?? t.summary ?? "";

          return (
            <Link key={id} to={`/trips/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{
                background: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.12)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img src={image} alt={title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{
                    fontFamily: "Georgia, serif", fontSize: "1.4rem",
                    marginBottom: "0.5rem", color: "#2b2b2b"
                  }}>{title}</h3>
                  {price != null && (
                    <p style={{ color: "#c19a5b", fontWeight: 700, marginBottom: "0.8rem" }}>
                      ${price}
                    </p>
                  )}
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.6,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {desc}
                  </p>
                  <span className="btn-gold" style={{
                    display: "inline-block", marginTop: "1.2rem",
                    padding: "0.6rem 1.4rem", fontSize: "0.8rem",
                    fontWeight: 700, letterSpacing: "1px"
                  }}>
                    VIEW DETAILS
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}