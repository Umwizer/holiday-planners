import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt, FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle,
} from "react-icons/fa";
import { getBookings, updateBookingStatus } from "../api";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  travelDate: string;
  numberOfPeople: number;
  status: string;
  trip?: { id: string; title: string; destination?: string };
};

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED"];

const statusMeta: Record<string, { color: string; bg: string }> = {
  PENDING:   { color: "#ff9800", bg: "#fff3e0" },
  CONFIRMED: { color: "#4caf50", bg: "#e8f5e9" },
  CANCELLED: { color: "#e53935", bg: "#ffebee" },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("adminUser") || "Admin";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  useEffect(() => {
    getBookings()
      .then((data: Booking[]) => setBookings(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id: string, newStatus: string) => {
    setBookings(b => b.map(x => (x.id === id ? { ...x, status: newStatus } : x)));
    try {
      await updateBookingStatus(id, newStatus);
    } catch {
      getBookings().then(setBookings).catch(() => {});
    }
  };

  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "PENDING").length,
    confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
    cancelled: bookings.filter(b => b.status === "CANCELLED").length,
  };

  const visible =
    filter === "ALL" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "2.5rem",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <p style={{
            color: "#c19a5b", borderLeft: "3px solid #c19a5b",
            paddingLeft: "0.8rem", marginBottom: "0.4rem", fontSize: "0.9rem",
          }}>
            Admin Panel
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "2.2rem",
            color: "#2b2b2b", margin: 0,
          }}>
            Welcome back, <span style={{ color: "#c19a5b" }}>{user}</span>
          </h1>
        </div>
        <button onClick={logout} className="btn-gold" style={{
          padding: "0.8rem 1.5rem", fontWeight: 600, letterSpacing: "1px",
          display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem",
        }}>
          <FaSignOutAlt /> LOGOUT
        </button>
      </div>

      {/* Stat cards — pure inline grid, horizontal on desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem",
      }}>
        <StatCard label="Total Bookings" value={counts.total} color="#c19a5b" icon={<FaCalendarCheck />} />
        <StatCard label="Pending" value={counts.pending} color="#ff9800" icon={<FaClock />} />
        <StatCard label="Confirmed" value={counts.confirmed} color="#4caf50" icon={<FaCheckCircle />} />
        <StatCard label="Cancelled" value={counts.cancelled} color="#e53935" icon={<FaTimesCircle />} />
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? "#c19a5b" : "#fff",
              color: filter === s ? "#fff" : "#2b2b2b",
              border: "1px solid #e0e0e0",
              padding: "0.5rem 1.1rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Bookings table */}
      <div style={{
        background: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
        padding: "2rem",
      }}>
        <h2 style={{
          fontFamily: "Georgia, serif", fontSize: "1.5rem",
          marginBottom: "1.5rem", color: "#2b2b2b",
        }}>
          Bookings
        </h2>

        {loading && <p>Loading bookings…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p style={{ color: "#888" }}>No bookings found.</p>
        )}

        {!loading && !error && visible.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "760px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                  <th style={th}>CUSTOMER</th>
                  <th style={th}>TRIP</th>
                  <th style={th}>TRAVEL DATE</th>
                  <th style={th}>PEOPLE</th>
                  <th style={th}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(b => {
                  const meta = statusMeta[b.status] || statusMeta.PENDING;
                  return (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={td}>
                        <div style={{ fontWeight: 600, color: "#2b2b2b" }}>
                          {b.customerName}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#999" }}>{b.email}</div>
                      </td>
                      <td style={td}>{b.trip?.title ?? "—"}</td>
                      <td style={td}>
                        {b.travelDate ? new Date(b.travelDate).toLocaleDateString() : "—"}
                      </td>
                      <td style={td}>{b.numberOfPeople}</td>
                      <td style={td}>
                        <select
                          value={b.status}
                          onChange={e => handleStatus(b.id, e.target.value)}
                          style={{
                            background: meta.bg,
                            color: meta.color,
                            border: `1px solid ${meta.color}40`,
                            padding: "0.35rem 0.7rem",
                            borderRadius: "20px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */
function StatCard({ label, value, color, icon }: {
  label: string; value: number; color: string; icon: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#fff", padding: "1.5rem",
      boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
      display: "flex", alignItems: "center", gap: "1rem",
      minWidth: 0,
    }}>
      <div style={{
        background: color, color: "#fff",
        width: "50px", height: "50px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem", flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#2b2b2b", lineHeight: 1.2 }}>
          {value}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#888", whiteSpace: "nowrap" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "0.8rem", fontSize: "0.82rem",
  color: "#888", fontWeight: 600,
};
const td: React.CSSProperties = {
  padding: "1rem 0.8rem", fontSize: "0.9rem", color: "#555",
};