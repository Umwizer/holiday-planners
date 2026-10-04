import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const search = params.get("search")?.toLowerCase() ?? "";
  const duration = params.get("duration") ?? "";
  const type = params.get("type") ?? "";

  useEffect(() => {
    getTrips()
      .then((data: Trip[]) => setTrips(Array.isArray(data) ? data : []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  const filtered = trips.filter(t => {
    // Where To
    if (search) {
      const haystack = `${t.title} ${t.destination}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    // Duration
    if (duration === "short" && t.durationDays > 2) return false;
    if (duration === "medium" && (t.durationDays < 3 || t.durationDays > 5)) return false;
    if (duration === "long" && t.durationDays < 6) return false;

    // Travel Type — keyword match against title/description
    if (type) {
      const haystack = `${t.title} ${t.description} ${t.destination}`.toLowerCase();
      if (!haystack.includes(type.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "10rem 2rem 4rem" }}>
      <p style={{
        color: "#c19a5b", marginBottom: "0.8rem",
        borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
        fontSize: "0.95rem", fontWeight: 500,
      }}>
        Our Tours
      </p>
      <h2 style={{
        fontFamily: "Georgia, serif", fontSize: "2.6rem",
        marginBottom: "1rem", color: "#2b2b2b",
      }}>
        All Available <strong>Trips</strong>
      </h2>

      {/* Active filter tags */}
      {(search || duration || type) && (
        <div style={{
          display: "flex", gap: "0.6rem", marginBottom: "2rem",
          flexWrap: "wrap", alignItems: "center",
        }}>
          <span style={{ fontSize: "0.85rem", color: "#888" }}>Filters:</span>
          {search && <Chip label={`"${search}"`} />}
          {duration && <Chip label={`Duration: ${duration}`} />}
          {type && <Chip label={`Type: ${type}`} />}
          <Link to="/trips" style={{
            fontSize: "0.8rem", color: "#c19a5b",
            textDecoration: "none", fontWeight: 600,
          }}>
            Clear all ×
          </Link>
        </div>
      )}

      {loading && <p>Loading trips…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p style={{ color: "#888" }}>
          No trips match your search. Try different filters.
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2rem",
      }}>
        {filtered.map(t => {
          const image =
            t.tripImages?.[0]?.imageCover ??
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800";

          return (
            <Link key={t.id} to={`/trips/${t.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{
                background: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s",
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
                  <img src={image} alt={t.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{
                    fontFamily: "Georgia, serif", fontSize: "1.4rem",
                    marginBottom: "0.5rem", color: "#2b2b2b",
                  }}>{t.title}</h3>
                  <p style={{ color: "#c19a5b", fontWeight: 700, marginBottom: "0.8rem" }}>
                    ${t.price}
                  </p>
                  <p style={{
                    color: "#666", fontSize: "0.9rem", lineHeight: 1.6,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {t.description}
                  </p>
                  <span className="btn-gold" style={{
                    display: "inline-block", marginTop: "1.2rem",
                    padding: "0.6rem 1.4rem", fontSize: "0.8rem",
                    fontWeight: 700, letterSpacing: "1px",
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

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      background: "#c19a5b", color: "#fff",
      padding: "0.3rem 0.9rem", borderRadius: "20px",
      fontSize: "0.75rem", fontWeight: 600,
    }}>{label}</span>
  );
}