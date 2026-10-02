import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTrip } from "../api";

export default function TourDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getTrip(id)
      .then(setTrip)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: "4rem", textAlign: "center" }}>Loading…</p>;
  if (error) return <p style={{ padding: "4rem", textAlign: "center", color: "red" }}>{error}</p>;
  if (!trip) return null;

  const title = trip.title ?? trip.name ?? trip.destination ?? "Trip";
  const image = trip.imageUrl ?? trip.image ?? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200";
  const price = trip.price ?? trip.cost;

  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
      <Link to="/trips" style={{ color: "#c19a5b", textDecoration: "none", fontWeight: 600 }}>
        ← Back to Trips
      </Link>

      <div style={{ height: "450px", overflow: "hidden", margin: "2rem 0" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem", marginBottom: "1rem" }}>
        {title}
      </h1>

      {price != null && (
        <p style={{ color: "#c19a5b", fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
          ${price}
        </p>
      )}

      <p style={{ color: "#555", lineHeight: 1.9, marginBottom: "2rem" }}>
        {trip.description ?? trip.summary ?? "No description available."}
      </p>

      <button className="btn-gold" style={{
        padding: "1rem 2.5rem", fontWeight: 700, letterSpacing: "1px"
      }}>
        BOOK NOW
      </button>
    </section>
  );
}