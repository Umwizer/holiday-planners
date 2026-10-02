import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* Top bar */}
      <div style={{
        background: "#2b2b2b", color: "#fff", fontSize: "0.85rem",
        display: "flex", justifyContent: "space-between", padding: "0.6rem 2rem"
      }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <span>✉️ holidayplanners@gmail.com</span>
          <span>📞 +123 456 7890</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#" style={{ color: "#fff" }}>f</a>
          <a href="#" style={{ color: "#fff" }}>📷</a>
          <a href="#" style={{ color: "#fff" }}>🐦</a>
        </div>
      </div>

      {/* Main nav */}
      <div style={{
        background: "#fff", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0.8rem 2rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <span style={{ fontSize: "1.8rem" }}>📍</span>
          <span style={{ fontWeight: 700, fontSize: "1.4rem", color: "#2b2b2b" }}>
            Holiday<span style={{ color: "#c19a5b" }}> Planners</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/trips" style={{
            background: "#c19a5b", color: "#fff", padding: "0.7rem 1.5rem",
            textDecoration: "none", fontWeight: 600, letterSpacing: "1px", fontSize: "0.85rem"
          }}>
            RESERVE
          </Link>
          <button style={{
            background: "transparent", border: "2px solid #2b2b2b",
            borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer"
          }}>🔍</button>
          <button style={{
            background: "#c19a5b", border: "none", borderRadius: "50%",
            width: "40px", height: "40px", cursor: "pointer", color: "#fff"
          }}>☰</button>
        </div>
      </div>
    </>
  );
}