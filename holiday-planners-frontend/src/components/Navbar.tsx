import { Link } from "react-router-dom";
import {
  FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter,
  FaSearch, FaBars, FaMapMarkerAlt,
} from "react-icons/fa";

const GOLD = "#c19a5b";
const DARK = "#2b2b2b";

export default function Navbar() {
  return (
    <header>
      {/* Top strip */}
      <div style={{
        background: DARK, color: "#fff", fontSize: "0.85rem",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "0.6rem 4rem"
      }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaEnvelope /> holidayplanners@gmail.com
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaPhoneAlt /> +123 456 7890
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.2rem" }}>
          <a href="#" style={{ color: "#fff" }}><FaFacebookF /></a>
          <a href="#" style={{ color: "#fff" }}><FaInstagram /></a>
          <a href="#" style={{ color: "#fff" }}><FaTwitter /></a>
        </div>
      </div>

      {/* Main bar */}
      <nav style={{
        background: "#fff", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0.9rem 4rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <FaMapMarkerAlt style={{ color: GOLD, fontSize: "1.8rem" }} />
          <span style={{ fontWeight: 700, fontSize: "1.5rem", color: DARK }}>
            Holiday <span style={{ color: GOLD }}>Planners</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/admin/login" style={{
            color: DARK, textDecoration: "none", fontWeight: 600,
            fontSize: "0.85rem", letterSpacing: "1px", padding: "0.8rem 0.5rem"
          }}>
            ADMIN
          </Link>
          <Link to="/trips" className="btn-gold" style={{
            padding: "0.8rem 1.8rem", textDecoration: "none",
            fontWeight: 600, letterSpacing: "1px", fontSize: "0.85rem"
          }}>
            RESERVE
          </Link>
          <button aria-label="Search" style={{
            background: "transparent", border: `2px solid ${DARK}`,
            borderRadius: "50%", width: "42px", height: "42px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <FaSearch />
          </button>
          <button aria-label="Menu" style={{
            background: GOLD, border: "none", borderRadius: "50%",
            width: "42px", height: "42px", cursor: "pointer", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );
}