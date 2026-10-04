import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaArrowLeft, FaStar } from "react-icons/fa";
import { getTestimonials, createTestimonial, deleteTestimonial } from "../api";

type Testimonial = {
  id: string;
  customerName: string;
  rating: number;
  quote: string;
  photoUrl?: string;
  source?: string;
};

type TestimonialForm = {
  customerName: string;
  rating: number;
  quote: string;
  photoUrl: string;
  source: string;
};

const emptyForm: TestimonialForm = {
  customerName: "",
  rating: 5,
  quote: "",
  photoUrl: "",
  source: "Rated by travelers on Instagram",
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  const load = () => {
    setLoading(true);
    getTestimonials()
      .then((d: Testimonial[]) => setItems(Array.isArray(d) ? d : []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createTestimonial(form);
      setShowForm(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "10rem 2rem 3rem" }}>
      <Link to="/admin/dashboard" style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        color: "#c19a5b", textDecoration: "none", fontWeight: 600, marginBottom: "1.5rem",
      }}>
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#2b2b2b", margin: 0 }}>
          Manage Testimonials
        </h1>
        <button onClick={() => setShowForm(true)} className="btn-gold" style={{
          padding: "0.8rem 1.5rem", fontWeight: 600, letterSpacing: "1px",
          display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem",
        }}>
          <FaPlus /> NEW REVIEW
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading…</p>}

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.2rem",
      }}>
        {items.map(t => (
          <div key={t.id} style={{
            background: "#fff", padding: "1.5rem",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
            borderLeft: "4px solid #c19a5b",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", gap: "0.2rem" }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} style={{ color: "#c19a5b", fontSize: "0.9rem" }} />
                ))}
              </div>
              <button onClick={() => remove(t.id)} style={{
                background: "transparent", border: "1px solid #e53935",
                color: "#e53935", padding: "0.3rem 0.5rem", cursor: "pointer",
                borderRadius: 4,
              }}><FaTrash size={11} /></button>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "0.8rem" }}>
              "{t.quote}"
            </p>
            <div style={{ fontWeight: 700, color: "#c19a5b", fontFamily: "Georgia, serif" }}>
              {t.customerName}
            </div>
            {t.source && <div style={{ fontSize: "0.75rem", color: "#999" }}>{t.source}</div>}
          </div>
        ))}
      </div>

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
              background: "#fff", padding: "2rem", maxWidth: "520px", width: "100%",
            }}
          >
            <h2 style={{ fontFamily: "Georgia, serif", marginBottom: "1.5rem" }}>New Testimonial</h2>

            <Field label="Customer Name" value={form.customerName}
              onChange={(v: string) => setForm({ ...form, customerName: v })} required />

            <Field label="Rating (1-5)" type="number" value={form.rating}
              onChange={(v: string) => setForm({ ...form, rating: Number(v) })} />

            <div style={{ marginBottom: "0.9rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "0.3rem" }}>
                Quote
              </label>
              <textarea value={form.quote} rows={4}
                onChange={e => setForm({ ...form, quote: e.target.value })}
                style={{
                  width: "100%", padding: "0.7rem 0.9rem",
                  border: "1px solid #ddd", outline: "none",
                  fontSize: "0.9rem", fontFamily: "inherit", resize: "vertical",
                }} />
            </div>

            <Field label="Photo URL" value={form.photoUrl}
              onChange={(v: string) => setForm({ ...form, photoUrl: v })} />
            <Field label="Source" value={form.source}
              onChange={(v: string) => setForm({ ...form, source: v })} />

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
              <button type="submit" className="btn-gold" style={{
                flex: 1, padding: "0.9rem", fontWeight: 700, letterSpacing: "1px",
              }}>CREATE</button>
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