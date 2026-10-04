import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft, FaClock,  FaMapMarkerAlt,
  FaCheckCircle, FaCalendarAlt, FaDollarSign,
} from "react-icons/fa";
import { getTrip, createBooking } from "../api";

type TripImage = { id: string; imageCover: string; isCover: boolean };
type Itinerary = { id: string; dayNumber: number; title: string; description: string };

type Trip = {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  discountPercent: number;
  durationDays: number;
  tripImages?: TripImage[];
  itinerary?: Itinerary[];
};

type BookingForm = {
  customerName: string;
  email: string;
  phone: string;
  travelDate: string;
  numberOfPeople: number;
};

const emptyForm: BookingForm = {
  customerName: "",
  email: "",
  phone: "",
  travelDate: "",
  numberOfPeople: 1,
};

export default function TourDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!id) return;
    getTrip(id)
      .then(setTrip)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip) return;
    setSubmitting(true);
    setFormError("");
    try {
      await createBooking(trip.id, {
        ...form,
        travelDate: new Date(form.travelDate).toISOString(),
        numberOfPeople: Number(form.numberOfPeople),
      });
      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ padding: "10rem 2rem", textAlign: "center" }}>Loading…</p>;
  if (error) return <p style={{ padding: "10rem 2rem", textAlign: "center", color: "red" }}>{error}</p>;
  if (!trip) return null;

  const cover =
    trip.tripImages?.find(i => i.isCover)?.imageCover ??
    trip.tripImages?.[0]?.imageCover ??
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200";

  const discountedPrice = trip.discountPercent
    ? Math.round(trip.price * (1 - trip.discountPercent / 100))
    : trip.price;

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "10rem 2rem 4rem" }}>
      <Link to="/trips" style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        color: "#c19a5b", textDecoration: "none", fontWeight: 600, marginBottom: "1.5rem",
      }}>
        <FaArrowLeft /> Back to Trips
      </Link>

      {/* Hero image */}
      <div style={{ height: "440px", overflow: "hidden", marginBottom: "2.5rem" }}>
        <img src={cover} alt={trip.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "3rem",
        alignItems: "start",
      }}>
        {/* LEFT — details */}
        <div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "2.6rem",
            color: "#2b2b2b", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            {trip.title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <Meta icon={<FaMapMarkerAlt />} label={trip.destination} />
            <Meta icon={<FaClock />} label={`${trip.durationDays} day${trip.durationDays > 1 ? "s" : ""}`} />
            {trip.discountPercent > 0 && (
              <Meta icon={<FaDollarSign />} label={`${trip.discountPercent}% off`} />
            )}
          </div>

          <p style={{
            color: "#555", lineHeight: 1.9, fontSize: "1rem", marginBottom: "2.5rem",
          }}>
            {trip.description}
          </p>

          {/* Itinerary */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <>
              <h2 style={{
                fontFamily: "Georgia, serif", fontSize: "1.8rem",
                color: "#2b2b2b", marginBottom: "1.5rem",
              }}>
                Itinerary
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {trip.itinerary.map(day => (
                  <div key={day.id} style={{
                    background: "#fafafa", padding: "1.2rem 1.5rem",
                    borderLeft: "4px solid #c19a5b",
                  }}>
                    <div style={{
                      fontSize: "0.75rem", color: "#c19a5b",
                      fontWeight: 700, letterSpacing: "1px", marginBottom: "0.3rem",
                    }}>
                      DAY {day.dayNumber}
                    </div>
                    <div style={{ fontWeight: 700, color: "#2b2b2b", marginBottom: "0.3rem" }}>
                      {day.title}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>
                      {day.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gallery */}
          {trip.tripImages && trip.tripImages.length > 1 && (
            <>
              <h2 style={{
                fontFamily: "Georgia, serif", fontSize: "1.8rem",
                color: "#2b2b2b", margin: "2.5rem 0 1.2rem",
              }}>
                Gallery
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "0.8rem",
              }}>
                {trip.tripImages.map(img => (
                  <img key={img.id} src={img.imageCover} alt=""
                    style={{
                      width: "100%", height: 140, objectFit: "cover",
                      borderRadius: 4,
                    }} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT — booking form */}
        <aside style={{
          background: "#fff", padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          position: "sticky", top: "120px",
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            {trip.discountPercent > 0 ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem" }}>
                  <span style={{
                    fontFamily: "Georgia, serif", fontSize: "2.2rem",
                    fontWeight: 700, color: "#c19a5b",
                  }}>
                    ${discountedPrice}
                  </span>
                  <span style={{
                    fontSize: "1rem", color: "#999", textDecoration: "line-through",
                  }}>
                    ${trip.price}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#888" }}>per person</div>
              </>
            ) : (
              <>
                <span style={{
                  fontFamily: "Georgia, serif", fontSize: "2.2rem",
                  fontWeight: 700, color: "#c19a5b",
                }}>
                  ${trip.price}
                </span>
                <div style={{ fontSize: "0.85rem", color: "#888" }}>per person</div>
              </>
            )}
          </div>

          {success ? (
            <div style={{
              background: "#e8f5e9", color: "#2e7d32",
              padding: "1.5rem", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem",
            }}>
              <FaCheckCircle style={{ fontSize: "2.5rem" }} />
              <div style={{ fontWeight: 700 }}>Booking received!</div>
              <div style={{ fontSize: "0.85rem" }}>
                We'll contact you shortly to confirm.
              </div>
              <button onClick={() => setSuccess(false)} style={{
                marginTop: "0.5rem", background: "transparent",
                border: "1px solid #2e7d32", color: "#2e7d32",
                padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600,
                borderRadius: 4, fontSize: "0.8rem",
              }}>
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{
                fontFamily: "Georgia, serif", fontSize: "1.2rem",
                marginBottom: "1.2rem", color: "#2b2b2b",
              }}>
                Book This Trip
              </h3>

              {formError && (
                <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "0.8rem" }}>
                  {formError}
                </p>
              )}

              <BookingField label="Full Name" value={form.customerName}
                onChange={(v: string) => setForm({ ...form, customerName: v })} required />
              <BookingField label="Email" type="email" value={form.email}
                onChange={(v: string) => setForm({ ...form, email: v })} required />
              <BookingField label="Phone" value={form.phone}
                onChange={(v: string) => setForm({ ...form, phone: v })} required />
              <BookingField label="Travel Date" type="date" value={form.travelDate}
                onChange={(v: string) => setForm({ ...form, travelDate: v })} required />
              <BookingField label="Number of People" type="number" value={form.numberOfPeople}
                onChange={(v: string) => setForm({ ...form, numberOfPeople: Number(v) })} required />

              <button type="submit" className="btn-gold" disabled={submitting} style={{
                width: "100%", padding: "1rem", marginTop: "0.8rem",
                fontWeight: 700, letterSpacing: "1px", fontSize: "0.9rem",
                opacity: submitting ? 0.6 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}>
                {submitting ? "BOOKING…" : "BOOK NOW"}
              </button>

              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.75rem", color: "#888",
                marginTop: "0.8rem", justifyContent: "center",
              }}>
                <FaCalendarAlt /> No account needed
              </div>
            </form>
          )}
        </aside>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */
function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      color: "#555", fontSize: "0.9rem",
    }}>
      <span style={{ color: "#c19a5b" }}>{icon}</span> {label}
    </span>
  );
}

type BookingFieldProps = {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
};

function BookingField({
  label, value, onChange, type = "text", required = false,
}: BookingFieldProps) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <label style={{
        display: "block", fontSize: "0.78rem",
        color: "#666", marginBottom: "0.3rem",
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        min={type === "number" ? 1 : undefined}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "0.7rem 0.9rem",
          border: "1px solid #ddd", outline: "none", fontSize: "0.9rem",
        }}
      />
    </div>
  );
}