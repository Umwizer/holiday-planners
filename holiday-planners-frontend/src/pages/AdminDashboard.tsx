import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle,
  FaDollarSign, FaRoute, FaChartLine, FaPercent, FaPlane, FaStar,
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from "recharts";
import { getBookings, updateBookingStatus, getTrips, getTestimonials } from "../api";
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

type Trip = {
  id: string;
  title: string;
  price: number;
  discountPercent?: number;
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
  const user = localStorage.getItem("adminUser") || "Admin";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [reviews, setReviews] = useState<{ rating: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("ALL");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    Promise.all([
      getBookings(),
      getTrips(),
      getTestimonials().catch(() => []), // reviews are optional: never break the page
    ])
      .then(([b, t, r]) => {
        setBookings(Array.isArray(b) ? b : []);
        setTrips(Array.isArray(t) ? t : []);
        setReviews(Array.isArray(r) ? r : []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /* Change a status: show it now, undo and show the reason if the server refuses */
  const handleStatus = async (id: string, newStatus: string) => {
    const before = bookings;
    setError("");
    setBookings(b => b.map(x => (x.id === id ? { ...x, status: newStatus } : x)));
    try {
      await updateBookingStatus(id, newStatus);
    } catch (e) {
      setBookings(before);
      setError("Could not change status. " + (e as Error).message);
    }
  };

  /* ---------- Analytics ---------- */
  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "PENDING").length,
    confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
    cancelled: bookings.filter(b => b.status === "CANCELLED").length,
  };

  // value of one booking = price after discount x number of people
  const getBookingValue = (b: Booking) => {
    const t = trips.find(x => x.id === b.trip?.id);
    const price = t ? t.price * (1 - (t.discountPercent || 0) / 100) : b.trip?.price ?? 0;
    return Math.round(price * (b.numberOfPeople || 1));
  };

  const sumByStatus = (status: string) =>
    bookings.filter(b => b.status === status).reduce((sum, b) => sum + getBookingValue(b), 0);

  const revenue = {
    confirmed: sumByStatus("CONFIRMED"),
    pending: sumByStatus("PENDING"),
    lost: sumByStatus("CANCELLED"),
  };

  // simple KPIs: average = total / count, rate = part / whole x 100
  const avgBooking = counts.confirmed ? Math.round(revenue.confirmed / counts.confirmed) : 0;
  const cancelRate = counts.total ? Math.round((counts.cancelled / counts.total) * 100) : 0;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "–";
  const travellingSoon = bookings.filter(b => {
    if (b.status === "CANCELLED" || !b.travelDate) return false;
    const days = (new Date(b.travelDate).getTime() - Date.now()) / 86400000;
    return days >= 0 && days <= 7;
  }).length;

  // monthly revenue for the chosen year (confirmed bookings, by travel month)
  const years = Array.from(new Set([
    new Date().getFullYear(),
    ...bookings.filter(b => b.travelDate).map(b => new Date(b.travelDate).getFullYear()),
  ])).sort();

  const monthly = MONTHS.map(m => ({ month: m, revenue: 0, bookings: 0 }));
  bookings
    .filter(b => b.status === "CONFIRMED" && b.travelDate)
    .forEach(b => {
      const d = new Date(b.travelDate);
      if (d.getFullYear() !== year) return;
      monthly[d.getMonth()].revenue += getBookingValue(b);
      monthly[d.getMonth()].bookings += 1;
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
      <AdminNav />

      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{
          color: "#c19a5b", borderLeft: "3px solid #c19a5b",
          paddingLeft: "0.8rem", marginBottom: "0.4rem", fontSize: "0.9rem",
        }}>
          Admin Panel · Analytics
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", color: "#2b2b2b", margin: 0 }}>
          Welcome back, <span style={{ color: "#c19a5b" }}>{user}</span>
        </h1>
      </div>

      {error && (
        <p style={{ color: "#e53935", background: "#ffebee", padding: "0.8rem 1rem", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      {loading && <p>Loading dashboard…</p>}

      {!loading && (
        <>
          {/* Money */}
          <div className="admin-grid-4">
            <StatCard label="Confirmed Revenue" value={fmt(revenue.confirmed)} color="#4caf50" icon={<FaDollarSign />} />
            <StatCard label="Pending Revenue" value={fmt(revenue.pending)} color="#ff9800" icon={<FaClock />} />
            <StatCard label="Lost Revenue" value={fmt(revenue.lost)} color="#e53935" icon={<FaTimesCircle />} />
            <StatCard label="Total Pipeline" value={fmt(revenue.confirmed + revenue.pending)} color="#c19a5b" icon={<FaChartLine />} />
          </div>

          {/* Counts */}
          <div className="admin-grid-4" style={{ marginTop: "1.5rem" }}>
            <StatCard label="Total Bookings" value={String(counts.total)} color="#2196f3" icon={<FaCalendarCheck />} />
            <StatCard label="Confirmed" value={String(counts.confirmed)} color="#4caf50" icon={<FaCheckCircle />} />
            <StatCard label="Pending" value={String(counts.pending)} color="#ff9800" icon={<FaClock />} />
            <StatCard label="Active Trips" value={String(trips.length)} color="#9c27b0" icon={<FaRoute />} />
          </div>

          {/* Insights */}
          <div className="admin-grid-4" style={{ marginTop: "1.5rem" }}>
            <StatCard label="Avg Confirmed Booking" value={fmt(avgBooking)} color="#2196f3" icon={<FaDollarSign />} />
            <StatCard label="Cancel Rate" value={cancelRate + "%"} color="#e53935" icon={<FaPercent />} />
            <StatCard label="Travelling in 7 Days" value={String(travellingSoon)} color="#c19a5b" icon={<FaPlane />} />
            <StatCard label={`Avg Rating (${reviews.length})`} value={avgRating} color="#ff9800" icon={<FaStar />} />
          </div>

          {/* Charts */}
          <div className="admin-charts-grid">
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={cardTitle}>Monthly Revenue (by travel month)</h2>
                <select value={year} onChange={e => setYear(Number(e.target.value))}
                  style={{ padding: "0.3rem 0.6rem", border: "1px solid #ddd", marginBottom: "1.2rem" }}>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
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
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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
                        <div style={{ background: "#eee", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={cardTitle}>Recent Bookings</h2>
                <Link to="/admin/bookings" style={{
                  color: "#c19a5b", fontWeight: 600, fontSize: "0.85rem",
                  textDecoration: "none", marginBottom: "1.2rem",
                }}>
                  View all bookings
                </Link>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map(s => (
                  <button key={s} onClick={() => setFilter(s)} style={{
                    background: filter === s ? "#c19a5b" : "#fff",
                    color: filter === s ? "#fff" : "#2b2b2b",
                    border: "1px solid #e0e0e0", padding: "0.35rem 0.9rem",
                    borderRadius: "20px", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
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
                                  background: meta.bg, color: meta.color,
                                  border: `1px solid ${meta.color}40`,
                                  padding: "0.25rem 0.5rem", borderRadius: "20px",
                                  fontSize: "0.7rem", fontWeight: 600, cursor: "pointer",
                                }}
                              >
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
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
        <div style={{ fontSize: "0.78rem", color: "#888" }}>{label}</div>
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