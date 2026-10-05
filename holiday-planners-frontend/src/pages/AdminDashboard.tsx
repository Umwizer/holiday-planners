import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt, FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle,
  FaDollarSign, FaRoute, FaChartLine,
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from "recharts";
import { getBookings, updateBookingStatus, getTrips } from "../api";

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

type Trip = {
  id: string;
  title: string;
  price: number;
  destination?: string;
};

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED"];
const statusMeta: Record<string, { color: string; bg: string }> = {
  PENDING:   { color: "#ff9800", bg: "#fff3e0" },
  CONFIRMED: { color: "#4caf50", bg: "#e8f5e9" },
  CANCELLED: { color: "#e53935", bg: "#ffebee" },
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("adminUser") || "Admin";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  useEffect(() => {
    Promise.all([getBookings(), getTrips()])
      .then(([b, t]: [Booking[], Trip[]]) => {
        setBookings(Array.isArray(b) ? b : []);
        setTrips(Array.isArray(t) ? t : []);
      })
      .catch((e: Error) => setError(e.message))
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

  /* ---------- Analytics ---------- */
  const tripPriceMap = new Map(trips.map(t => [t.id, t.price]));

  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "PENDING").length,
    confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
    cancelled: bookings.filter(b => b.status === "CANCELLED").length,
  };

  const getBookingValue = (b: Booking) => {
    const price = b.trip?.price ?? (b.trip?.id ? tripPriceMap.get(b.trip.id) : 0) ?? 0;
    return price * (b.numberOfPeople || 1);
  };

  const revenue = {
    confirmed: bookings
      .filter(b => b.status === "CONFIRMED")
      .reduce((sum, b) => sum + getBookingValue(b), 0),
    pending: bookings
      .filter(b => b.status === "PENDING")
      .reduce((sum, b) => sum + getBookingValue(b), 0),
    lost: bookings
      .filter(b => b.status === "CANCELLED")
      .reduce((sum, b) => sum + getBookingValue(b), 0),
  };

  const monthly: { month: string; revenue: number; bookings: number }[] =
    MONTHS.map(m => ({ month: m, revenue: 0, bookings: 0 }));

  bookings
    .filter(b => b.status === "CONFIRMED" && b.travelDate)
    .forEach(b => {
      const d = new Date(b.travelDate);
      const idx = d.getMonth();
      if (idx >= 0 && idx < 12) {
        monthly[idx].revenue += getBookingValue(b);
        monthly[idx].bookings += 1;
      }
    });

  const pieData = [
    { name: "Confirmed", value: counts.confirmed, color: "#4caf50" },
    { name: "Pending",   value: counts.pending,   color: "#ff9800" },
    { name: "Cancelled", value: counts.cancelled, color: "#e53935" },
  ].filter(x => x.value > 0);

  const tripBookingCount = new Map<string, number>();
  bookings.forEach(b => {
    const tid = b.trip?.id;
    if (tid) tripBookingCount.set(tid, (tripBookingCount.get(tid) || 0) + 1);
  });
  const topTrips = trips
    .map(t => ({ ...t, bookings: tripBookingCount.get(t.id) || 0 }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5);

  const visible = filter === "ALL" ? bookings : bookings.filter(b => b.status === filter);

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "10rem 2rem 4rem" }}>
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
            Admin Panel · Analytics
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "2.2rem",
            color: "#2b2b2b", margin: 0,
          }}>
            Welcome back, <span style={{ color: "#c19a5b" }}>{user}</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link to="/admin/trips" className="btn-gold" style={topBtn}>MANAGE TRIPS</Link>
          <Link to="/admin/testimonials" className="btn-gold" style={topBtn}>MANAGE REVIEWS</Link>
          <button onClick={logout} className="btn-gold" style={{
            ...topBtn, display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading dashboard…</p>}

      {!loading && (
        <>
          {/* Revenue row */}
          <div className="admin-grid-4">
            <StatCard label="Confirmed Revenue" value={fmt(revenue.confirmed)} color="#4caf50" icon={<FaDollarSign />} />
            <StatCard label="Pending Revenue" value={fmt(revenue.pending)} color="#ff9800" icon={<FaClock />} />
            <StatCard label="Lost Revenue" value={fmt(revenue.lost)} color="#e53935" icon={<FaTimesCircle />} />
            <StatCard label="Total Pipeline" value={fmt(revenue.confirmed + revenue.pending)} color="#c19a5b" icon={<FaChartLine />} />
          </div>

          {/* Counts row */}
          <div className="admin-grid-4" style={{ marginTop: "1.5rem" }}>
            <StatCard label="Total Bookings" value={String(counts.total)} color="#2196f3" icon={<FaCalendarCheck />} />
            <StatCard label="Confirmed" value={String(counts.confirmed)} color="#4caf50" icon={<FaCheckCircle />} />
            <StatCard label="Pending" value={String(counts.pending)} color="#ff9800" icon={<FaClock />} />
            <StatCard label="Active Trips" value={String(trips.length)} color="#9c27b0" icon={<FaRoute />} />
          </div>

          {/* Charts */}
          <div className="admin-charts-grid">
            <div style={card}>
              <h2 style={cardTitle}>Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: any) => fmt(Number(v))} />
                  <Bar dataKey="revenue" fill="#c19a5b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={card}>
              <h2 style={cardTitle}>Status Breakdown</h2>
              {pieData.length === 0 ? (
                <p style={{ color: "#888" }}>No bookings yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name"
                      innerRadius={60} outerRadius={95} paddingAngle={3}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top trips + recent bookings */}
          <div className="admin-lower-grid">
            <div style={card}>
              <h2 style={cardTitle}>Top Trips</h2>
              {topTrips.length === 0 ? (
                <p style={{ color: "#888" }}>No trips yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {topTrips.map(t => {
                    const max = Math.max(...topTrips.map(x => x.bookings), 1);
                    const pct = Math.round((t.bookings / max) * 100);
                    return (
                      <div key={t.id}>
                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          fontSize: "0.88rem", marginBottom: "0.3rem",
                        }}>
                          <span style={{ fontWeight: 600, color: "#2b2b2b" }}>
                            {t.destination || t.title}
                          </span>
                          <span style={{ color: "#c19a5b", fontWeight: 600 }}>
                            {t.bookings} {t.bookings === 1 ? "booking" : "bookings"}
                          </span>
                        </div>
                        <div style={{
                          background: "#eee", height: "8px",
                          borderRadius: "4px", overflow: "hidden",
                        }}>
                          <div style={{
                            background: "#c19a5b", height: "100%",
                            width: `${pct}%`, transition: "width 0.6s",
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={card}>
              <h2 style={cardTitle}>Recent Bookings</h2>

              <div style={{
                display: "flex", gap: "0.5rem",
                marginBottom: "1rem", flexWrap: "wrap",
              }}>
                {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map(s => (
                  <button key={s} onClick={() => setFilter(s)} style={{
                    background: filter === s ? "#c19a5b" : "#fff",
                    color: filter === s ? "#fff" : "#2b2b2b",
                    border: "1px solid #e0e0e0",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}>
                    {s}
                  </button>
                ))}
              </div>

              {visible.length === 0 ? (
                <p style={{ color: "#888" }}>No bookings.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                        <th style={th}>CUSTOMER</th>
                        <th style={th}>TRIP</th>
                        <th style={th}>VALUE</th>
                        <th style={th}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.slice(0, 8).map(b => {
                        const meta = statusMeta[b.status] || statusMeta.PENDING;
                        return (
                          <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                            <td style={td}>
                              <div style={{ fontWeight: 600, color: "#2b2b2b", fontSize: "0.85rem" }}>
                                {b.customerName}
                              </div>
                            </td>
                            <td style={{ ...td, fontSize: "0.82rem" }}>
                              {b.trip?.title?.slice(0, 20) ?? "—"}
                            </td>
                            <td style={{ ...td, fontSize: "0.85rem", fontWeight: 600, color: "#c19a5b" }}>
                              {fmt(getBookingValue(b))}
                            </td>
                            <td style={td}>
                              <select value={b.status}
                                onChange={e => handleStatus(b.id, e.target.value)}
                                style={{
                                  background: meta.bg,
                                  color: meta.color,
                                  border: `1px solid ${meta.color}40`,
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "20px",
                                  fontSize: "0.7rem",
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
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Helpers ---------- */
function StatCard({
  label, value, color, icon,
}: { label: string; value: string; color: string; icon: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", padding: "1.5rem",
      boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
      display: "flex", alignItems: "center", gap: "1rem", minWidth: 0,
    }}>
      <div style={{
        background: color, color: "#fff",
        width: "50px", height: "50px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem", flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2b2b2b", lineHeight: 1.2 }}>
          {value}
        </div>
        <div style={{ fontSize: "0.78rem", color: "#888", whiteSpace: "nowrap" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  padding: "1.8rem",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
};
const cardTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "1.15rem",
  color: "#2b2b2b",
  marginBottom: "1.2rem",
  marginTop: 0,
};
const topBtn: React.CSSProperties = {
  padding: "0.7rem 1.1rem",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.75rem",
  letterSpacing: "1px",
};
const th: React.CSSProperties = {
  padding: "0.6rem 0.5rem",
  fontSize: "0.72rem",
  color: "#888",
  fontWeight: 600,
};
const td: React.CSSProperties = {
  padding: "0.7rem 0.5rem",
  color: "#555",
};