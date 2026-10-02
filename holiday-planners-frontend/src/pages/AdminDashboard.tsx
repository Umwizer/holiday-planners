import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaRoute, FaCalendarCheck, FaStar, FaUsers } from "react-icons/fa";

const stats = [
  { icon: <FaRoute />, label: "Total Trips", value: 24, color: "#c19a5b" },
  { icon: <FaCalendarCheck />, label: "Bookings", value: 156, color: "#4caf50" },
  { icon: <FaStar />, label: "Testimonials", value: 42, color: "#ff9800" },
  { icon: <FaUsers />, label: "Admins", value: 3, color: "#2196f3" },
];

const recentBookings = [
  { id: 1, customer: "Aline Uwase", trip: "Kigali City Tour", date: "2026-10-01", status: "Confirmed" },
  { id: 2, customer: "Eric Mugisha", trip: "Volcanoes National Park", date: "2026-09-30", status: "Pending" },
  { id: 3, customer: "Claudine Mukamana", trip: "Lake Kivu Retreat", date: "2026-09-29", status: "Confirmed" },
  { id: 4, customer: "Jean Paul Habimana", trip: "Nyungwe Canopy Walk", date: "2026-09-28", status: "Cancelled" },
  { id: 5, customer: "Diane Ingabire", trip: "Akagera Safari", date: "2026-09-27", status: "Confirmed" },
];

const statusColor: Record<string, string> = {
  Confirmed: "#4caf50",
  Pending: "#ff9800",
  Cancelled: "#e53935",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("adminUser") || "Admin";

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem"
      }}>
        <div>
          <p style={{
            color: "#c19a5b", borderLeft: "3px solid #c19a5b",
            paddingLeft: "0.8rem", marginBottom: "0.4rem", fontSize: "0.9rem"
          }}>
            Admin Panel
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "2.2rem",
            color: "#2b2b2b", margin: 0
          }}>
            Welcome back, <span style={{ color: "#c19a5b" }}>{user}</span>
          </h1>
        </div>
        <button onClick={logout} className="btn-gold" style={{
          padding: "0.8rem 1.5rem", fontWeight: 600, letterSpacing: "1px",
          display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem"
        }}>
          <FaSignOutAlt /> LOGOUT
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem", marginBottom: "3rem"
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "#fff", padding: "1.8rem",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", gap: "1.2rem"
          }}>
            <div style={{
              background: s.color, color: "#fff",
              width: "55px", height: "55px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem"
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#2b2b2b" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#888" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{
        background: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
        padding: "2rem"
      }}>
        <h2 style={{
          fontFamily: "Georgia, serif", fontSize: "1.5rem",
          marginBottom: "1.5rem", color: "#2b2b2b"
        }}>
          Recent Bookings
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "0.8rem", fontSize: "0.85rem", color: "#888" }}>CUSTOMER</th>
              <th style={{ padding: "0.8rem", fontSize: "0.85rem", color: "#888" }}>TRIP</th>
              <th style={{ padding: "0.8rem", fontSize: "0.85rem", color: "#888" }}>DATE</th>
              <th style={{ padding: "0.8rem", fontSize: "0.85rem", color: "#888" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map(b => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "1rem 0.8rem", fontWeight: 600, color: "#2b2b2b" }}>
                  {b.customer}
                </td>
                <td style={{ padding: "1rem 0.8rem", color: "#555" }}>{b.trip}</td>
                <td style={{ padding: "1rem 0.8rem", color: "#555" }}>{b.date}</td>
                <td style={{ padding: "1rem 0.8rem" }}>
                  <span style={{
                    background: statusColor[b.status] + "20",
                    color: statusColor[b.status],
                    padding: "0.3rem 0.8rem", fontSize: "0.8rem",
                    fontWeight: 600, borderRadius: "12px"
                  }}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ color: "#999", fontSize: "0.85rem", marginTop: "2rem", textAlign: "center" }}>
        Dashboard shows static demo data. Live data will be connected soon.
      </p>
    </section>
  );
}