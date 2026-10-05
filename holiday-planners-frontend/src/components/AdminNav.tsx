import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const LINKS = [
  ["Dashboard", "/admin/dashboard"],
  ["Bookings", "/admin/bookings"],
  ["Trips", "/admin/trips"],
  ["Reviews", "/admin/testimonials"],
];

export default function AdminNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem",
    }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {LINKS.map(([name, path]) => {
          const active = pathname === path; // highlight the page we are on
          return (
            <Link key={path} to={path} style={{
              padding: "0.6rem 1.2rem", textDecoration: "none",
              fontWeight: 600, fontSize: "0.82rem",
              background: active ? "#c19a5b" : "#fff",
              color: active ? "#fff" : "#2b2b2b",
              border: "1px solid #e0e0e0",
            }}>
              {name}
            </Link>
          );
        })}
      </div>

      <button onClick={logout} style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        background: "transparent", border: "1px solid #e53935", color: "#e53935",
        padding: "0.6rem 1.2rem", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer",
      }}>
        <FaSignOutAlt /> Log out
      </button>
    </div>
  );
}