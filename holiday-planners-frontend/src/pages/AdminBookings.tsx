import { useEffect, useState } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { getBookings, getTrips, updateBookingStatus, deleteBooking } from "../api";
import AdminNav from "../components/AdminNav";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  travelDate: string;
  numberOfPeople: number;
  status: string;
  trip?: { id: string; title: string; price?: number };
};

type Trip = { id: string; title: string; price: number; discountPercent?: number };

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"];
const COLORS: Record<string, { color: string; bg: string }> = {
  PENDING: { color: "#ff9800", bg: "#fff3e0" },
  CONFIRMED: { color: "#4caf50", bg: "#e8f5e9" },
  CANCELLED: { color: "#e53935", bg: "#ffebee" },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getBookings(), getTrips()])
      .then(([b, t]) => {
        setBookings(Array.isArray(b) ? b : []);
        setTrips(Array.isArray(t) ? t : []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Money: price after discount x people ---------- */
  const valueOf = (b: Booking) => {
    const t = trips.find(x => x.id === b.trip?.id);
    const price = t ? t.price * (1 - (t.discountPercent || 0) / 100) : b.trip?.price ?? 0;
    return Math.round(price * (b.numberOfPeople || 1));
  };
  const money = (n: number) => "$" + n.toLocaleString();

  /* ---------- Change status (show it now, undo if the server says no) ---------- */
  const changeStatus = async (id: string, status: string) => {
    const before = bookings;
    setError("");
    setSavingId(id);
    setBookings(list => list.map(b => (b.id === id ? { ...b, status } : b)));
    try {
      await updateBookingStatus(id, status);
    } catch (e) {
      setBookings(before);
      setError("Could not change status. " + (e as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    try {
      await deleteBooking(id);
      setBookings(list => list.filter(b => b.id !== id));
    } catch (e) {
      setError("Could not delete. " + (e as Error).message);
    }
  };

  /* ---------- Filter + search ---------- */
  const visible = bookings
    .filter(b => filter === "ALL" || b.status === filter)
    .filter(b => {
      const q = search.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        (b.trip?.title ?? "").toLowerCase().includes(q)
      );
    });

  const countOf = (s: string) =>
    s === "ALL" ? bookings.length : bookings.filter(b => b.status === s).length;

  const daysUntil = (date: string) =>
    Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);

  /* ---------- CSV report (exports what you currently see) ---------- */
  const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const downloadReport = () => {
    const rows = [["Customer", "Email", "Phone", "Trip", "Travel date", "People", "Value", "Status"]];
    visible.forEach(b =>
      rows.push([
        b.customerName, b.email, b.phone, b.trip?.title ?? "",
        b.travelDate?.slice(0, 10), String(b.numberOfPeople), String(valueOf(b)), b.status,
      ])
    );
    const csv = rows.map(r => r.map(cell).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "bookings-report.csv";
    a.click();
  };

  return (
    <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "10rem 2rem 4rem" }}>
      <AdminNav />

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem",
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#2b2b2b", margin: 0 }}>
          Bookings
        </h1>
        <button onClick={downloadReport} className="btn-gold" style={{
          padding: "0.8rem 1.5rem", fontWeight: 600, fontSize: "0.82rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <FaDownload /> Export {visible.length} to CSV
        </button>
      </div>

      {error && (
        <p style={{ color: "#e53935", background: "#ffebee", padding: "0.8rem 1rem", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      {loading && <p>Loading bookings…</p>}

      {!loading && (
        <div style={{ background: "#fff", padding: "1.5rem", boxShadow: "0 5px 20px rgba(0,0,0,0.06)" }}>
          {/* Filters + search */}
          <div style={{
            display: "flex", justifyContent: "space-between", flexWrap: "wrap",
            gap: "1rem", marginBottom: "1.2rem",
          }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["ALL", ...STATUSES].map(s => (
                <button key={s} onClick={() => setFilter(s)} style={{
                  background: filter === s ? "#c19a5b" : "#fff",
                  color: filter === s ? "#fff" : "#2b2b2b",
                  border: "1px solid #e0e0e0", padding: "0.4rem 1rem",
                  borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                }}>
                  {s} ({countOf(s)})
                </button>
              ))}
            </div>
            <input
              placeholder="Search name, email or trip…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: "0.6rem 1rem", border: "1px solid #ddd", outline: "none",
                fontSize: "0.85rem", minWidth: "260px", maxWidth: "100%",
              }}
            />
          </div>

          {visible.length === 0 ? (
            <p style={{ color: "#888" }}>No bookings match.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "860px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                    {["Customer", "Contact", "Trip", "Travel date", "People", "Value", "Status", ""].map(h => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map(b => {
                    const c = COLORS[b.status] || COLORS.PENDING;
                    const days = daysUntil(b.travelDate);
                    const soon = b.status !== "CANCELLED" && days >= 0 && days <= 7;
                    return (
                      <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ ...td, fontWeight: 600, color: "#2b2b2b" }}>{b.customerName}</td>
                        <td style={td}>
                          <a href={`mailto:${b.email}`} style={link}>{b.email}</a><br />
                          <a href={`tel:${b.phone}`} style={link}>{b.phone}</a>
                        </td>
                        <td style={td}>{b.trip?.title ?? "—"}</td>
                        <td style={td}>
                          {b.travelDate?.slice(0, 10)}
                          {soon && (
                            <div style={{ color: "#c19a5b", fontWeight: 700, fontSize: "0.72rem" }}>
                              {days === 0 ? "Today" : `In ${days} day${days > 1 ? "s" : ""}`}
                            </div>
                          )}
                        </td>
                        <td style={td}>{b.numberOfPeople}</td>
                        <td style={{ ...td, fontWeight: 600, color: "#c19a5b" }}>{money(valueOf(b))}</td>
                        <td style={td}>
                          <select
                            value={b.status}
                            disabled={savingId === b.id}
                            onChange={e => changeStatus(b.id, e.target.value)}
                            style={{
                              background: c.bg, color: c.color, border: `1px solid ${c.color}40`,
                              padding: "0.3rem 0.6rem", borderRadius: "20px",
                              fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                              opacity: savingId === b.id ? 0.5 : 1,
                            }}
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={td}>
                          <button onClick={() => remove(b.id)} aria-label="Delete booking" style={{
                            background: "transparent", border: "1px solid #e53935", color: "#e53935",
                            padding: "0.35rem 0.5rem", cursor: "pointer", borderRadius: 4,
                          }}>
                            <FaTrash size={11} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const th: React.CSSProperties = { padding: "0.7rem 0.6rem", fontSize: "0.78rem", color: "#888", fontWeight: 600 };
const td: React.CSSProperties = { padding: "0.8rem 0.6rem", fontSize: "0.85rem", color: "#555", verticalAlign: "top" };
const link: React.CSSProperties = { color: "#555", textDecoration: "none", fontSize: "0.8rem" };