import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock,
  FaFacebookF, FaInstagram, FaTwitter, FaCheckCircle, FaArrowLeft,
} from "react-icons/fa";

type Form = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const emptyForm: Form = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const INFO = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Our Location",
    lines: ["KN 5 Rd, Kigali", "Rwanda"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Phone Number",
    lines: ["+250 788 456 789", "+250 788 123 456"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email Address",
    lines: ["holidayplanners@gmail.com", "support@holidayplanners.com"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Mon – Fri: 8am – 6pm", "Sat – Sun: 9am – 4pm"],
  },
];

export default function Contact() {
  const [form, setForm] = useState<Form>(emptyForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in name, email and message.");
      return;
    }
    // Frontend-only demo — just show success
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with our team.</p>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        {/* Info cards */}
        <div className="contact-info-grid">
          {INFO.map(card => (
            <div key={card.title} style={{
              background: "#fff", padding: "2rem 1.5rem",
              textAlign: "center",
              boxShadow: "0 5px 25px rgba(0,0,0,0.06)",
              borderTop: "3px solid #c19a5b",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 25px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{
                width: "60px", height: "60px", borderRadius: "50%",
                background: "#c19a5b", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.2rem",
                fontSize: "1.4rem",
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "Georgia, serif", fontSize: "1.15rem",
                color: "#2b2b2b", marginBottom: "0.8rem",
              }}>{card.title}</h3>
              {card.lines.map(l => (
                <p key={l} style={{
                  color: "#666", fontSize: "0.9rem",
                  lineHeight: 1.6, margin: 0,
                }}>{l}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="contact-main-grid">
          {/* Form */}
          <div style={{
            background: "#fff", padding: "2.5rem",
            boxShadow: "0 5px 25px rgba(0,0,0,0.06)",
          }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "#c19a5b", textDecoration: "none", fontWeight: 600,
              fontSize: "0.85rem", marginBottom: "1.5rem",
            }}>
              <FaArrowLeft /> Back to Home
            </Link>

            <h2 style={{
              fontFamily: "Georgia, serif", fontSize: "2rem",
              color: "#2b2b2b", marginBottom: "0.6rem",
            }}>
              Send us a Message
            </h2>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
              We'll get back to you within 24 hours.
            </p>

            {sent ? (
              <div style={{
                background: "#e8f5e9", color: "#2e7d32",
                padding: "2rem", textAlign: "center",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "0.8rem",
              }}>
                <FaCheckCircle style={{ fontSize: "2.5rem" }} />
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Message sent!</div>
                <div style={{ fontSize: "0.9rem" }}>Thank you — we'll be in touch shortly.</div>
                <button onClick={() => setSent(false)} style={{
                  marginTop: "0.5rem", background: "transparent",
                  border: "1px solid #2e7d32", color: "#2e7d32",
                  padding: "0.5rem 1rem", cursor: "pointer",
                  fontWeight: 600, borderRadius: 4, fontSize: "0.8rem",
                }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                {error && (
                  <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "1rem" }}>
                    {error}
                  </p>
                )}

                <div className="contact-form-row">
                  <ContactField label="Your Name *" value={form.name}
                    onChange={(v: string) => setForm({ ...form, name: v })} />
                  <ContactField label="Your Email *" type="email" value={form.email}
                    onChange={(v: string) => setForm({ ...form, email: v })} />
                </div>

                <div className="contact-form-row">
                  <ContactField label="Phone Number" value={form.phone}
                    onChange={(v: string) => setForm({ ...form, phone: v })} />
                  <ContactField label="Subject" value={form.subject}
                    onChange={(v: string) => setForm({ ...form, subject: v })} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    value={form.message}
                    rows={5}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{
                  padding: "1rem 2.5rem", fontWeight: 700,
                  letterSpacing: "1px", fontSize: "0.85rem",
                }}>
                  SEND MESSAGE
                </button>

                {/* Socials */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  marginTop: "2rem", paddingTop: "1.5rem",
                  borderTop: "1px solid #eee",
                }}>
                  <span style={{ fontSize: "0.85rem", color: "#888" }}>Follow us:</span>
                  <a href="#" style={socialBtn}><FaFacebookF /></a>
                  <a href="#" style={socialBtn}><FaInstagram /></a>
                  <a href="#" style={socialBtn}><FaTwitter /></a>
                </div>
              </form>
            )}
          </div>

          {/* Map */}
          <div style={{
            background: "#fff",
            boxShadow: "0 5px 25px rgba(0,0,0,0.06)",
            overflow: "hidden",
            minHeight: "400px",
          }}>
            <iframe
              title="Our location"
              src="https://www.google.com/maps?q=Kigali,Rwanda&output=embed"
              style={{ width: "100%", height: "100%", minHeight: "400px", border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Helpers ---------- */
type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
};

function ContactField({ label, value, onChange, type = "text" }: FieldProps) {
  return (
    <div style={{ marginBottom: "1rem", flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "#666",
  marginBottom: "0.4rem",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "0.9rem",
  background: "#fafafa",
};

const socialBtn: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#c19a5b",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.85rem",
  textDecoration: "none",
};