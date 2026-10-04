import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { getTrips, createTrip, updateTrip, deleteTrip } from "../api";

type TripImage = { imageCover: string; isCover: boolean };

type Trip = {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  discountPercent: number;
  durationDays: number;
  tripImages?: TripImage[];
};

type TripForm = {
  title: string;
  description: string;
  destination: string;
  price: number;
  discountPercent: number;
  durationDays: number;
  imageCover: string;
};

const emptyForm: TripForm = {
  title: "",
  description: "",
  destination: "",
  price: 0,
  discountPercent: 0,
  durationDays: 1,
  imageCover: "",
};

export default function AdminTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Trip | null>(null);
  const [form, setForm] = useState<TripForm>(emptyForm);

  const load = () => {
    setLoading(true);
    getTrips()
      .then((data: Trip[]) => setTrips(Array.isArray(data) ? data : []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (t: Trip) => {
    setEditing(t);
    setForm({
      title: t.title,
      description: t.description,
      destination: t.destination,
      price: t.price,
      discountPercent: t.discountPercent,
      durationDays: t.durationDays,
      imageCover: t.tripImages?.[0]?.imageCover ?? "",
    });
    setShowForm(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const payload = {
      title: form.title,
      description: form.description,
      destination: form.destination,
      price: Number(form.price),
      discountPercent: Number(form.discountPercent),
      durationDays: Number(form.durationDays),
      tripImages: form.imageCover
        ? [{ imageCover: form.imageCover, isCover: true }]
        : [],
      itinerary: [],
    };
    try {
      if (editing) await updateTrip(editing.id, payload);
      else await createTrip(payload);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this trip?")) return;
    try {
      await deleteTrip(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      <Link to="/admin/dashboard" style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        color: "#c19a5b", textDecoration: "none", fontWeight: 600,
        marginBottom: "1.5rem",
      }}>
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
      }}>
        <h1 style={{
          fontFamily: "Georgia, serif", fontSize: "2rem",
          color: "#2b2b2b", margin: 0,
        }}>Manage Trips</h1>
        <button onClick={openCreate} className="btn-gold" style={{
          padding: "0.8rem 1.5rem", fontWeight: 600, letterSpacing: "1px",
          display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem",
        }}>
          <FaPlus /> NEW TRIP
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading…</p>}

      {!loading && (
        <div style={{
          background: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          padding: "1.5rem", overflowX: "auto",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                <th style={th}>IMAGE</th>
                <th style={th}>TITLE</th>
                <th style={th}>DESTINATION</th>
                <th style={th}>PRICE</th>
                <th style={th}>DAYS</th>
                <th style={th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {trips.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={td}>
                    {t.tripImages?.[0]?.imageCover ? (
                      <img src={t.tripImages[0].imageCover} alt={t.title}
                        style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 60, height: 40, background: "#eee", borderRadius: 4 }} />
                    )}
                  </td>
                  <td style={{ ...td, fontWeight: 600, color: "#2b2b2b" }}>{t.title}</td>
                  <td style={td}>{t.destination}</td>
                  <td style={td}>${t.price}</td>
                  <td style={td}>{t.durationDays}</td>
                  <td style={td}>
                    <button onClick={() => openEdit(t)} style={iconBtn("#2196f3")}>
                      <FaEdit />
                    </button>
                    <button onClick={() => remove(t.id)} style={iconBtn("#e53935")}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, padding: "1rem",
        }} onClick={() => setShowForm(false)}>
          <form
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onSubmit={submit}
            style={{
              background: "#fff", padding: "2rem", maxWidth: "560px",
              width: "100%", maxHeight: "90vh", overflowY: "auto",
            }}
          >
            <h2 style={{ fontFamily: "Georgia, serif", marginBottom: "1.5rem" }}>
              {editing ? "Edit Trip" : "New Trip"}
            </h2>

            <Field label="Title" value={form.title}
              onChange={(v: string) => setForm({ ...form, title: v })} required />
            <Field label="Destination" value={form.destination}
              onChange={(v: string) => setForm({ ...form, destination: v })} required />

            <Textarea label="Description" value={form.description}
              onChange={(v: string) => setForm({ ...form, description: v })} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
              <Field label="Price ($)" type="number" value={form.price}
                onChange={(v: string) => setForm({ ...form, price: Number(v) })} />
              <Field label="Discount %" type="number" value={form.discountPercent}
                onChange={(v: string) => setForm({ ...form, discountPercent: Number(v) })} />
              <Field label="Days" type="number" value={form.durationDays}
                onChange={(v: string) => setForm({ ...form, durationDays: Number(v) })} />
            </div>

            <Field label="Image URL" value={form.imageCover}
              onChange={(v: string) => setForm({ ...form, imageCover: v })} />

            {form.imageCover && (
              <img src={form.imageCover} alt="preview"
                style={{ width: "100%", height: 160, objectFit: "cover", marginBottom: "1rem" }} />
            )}

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
              <button type="submit" className="btn-gold" style={{
                flex: 1, padding: "0.9rem", fontWeight: 700, letterSpacing: "1px",
              }}>
                {editing ? "UPDATE" : "CREATE"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{
                padding: "0.9rem 1.5rem", background: "#eee", border: "none",
                cursor: "pointer", fontWeight: 600,
              }}>CANCEL</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
};

function Field({ label, value, onChange, type = "text", required = false }: FieldProps) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "0.3rem" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "0.7rem 0.9rem",
          border: "1px solid #ddd", outline: "none", fontSize: "0.9rem",
        }}
      />
    </div>
  );
}

type TextareaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

function Textarea({ label, value, onChange }: TextareaProps) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "0.3rem" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        style={{
          width: "100%", padding: "0.7rem 0.9rem",
          border: "1px solid #ddd", outline: "none", fontSize: "0.9rem",
          fontFamily: "inherit", resize: "vertical",
        }}
      />
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "0.8rem", fontSize: "0.82rem", color: "#888", fontWeight: 600,
};
const td: React.CSSProperties = {
  padding: "0.8rem", fontSize: "0.9rem", color: "#555",
};
const iconBtn = (color: string): React.CSSProperties => ({
  background: "transparent", border: `1px solid ${color}`,
  color, padding: "0.4rem 0.6rem", cursor: "pointer",
  marginRight: "0.4rem", borderRadius: "4px",
});