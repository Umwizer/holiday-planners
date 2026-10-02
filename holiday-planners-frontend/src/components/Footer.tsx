import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#2b2b2b", color: "#e8e8e8" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1.5fr",
        gap: "3rem",
        padding: "3rem 4rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Column 1: Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
            <span style={{ fontSize: "2rem" }}>📍</span>
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#fff" }}>
              Holiday <span style={{ color: "#c19a5b" }}>Planners</span>
            </span>
          </div>
          <p style={{ lineHeight: 1.7, fontSize: "0.9rem", opacity: 0.85, marginBottom: "1.5rem" }}>
            Holiday Planners sit amet consectetur adipisicing elit. Perferendis
            sapiente explicabo fugit, sit mollitia eum atque excepturi quaerat autem.
          </p>

          {/* Newsletter */}
          <div style={{ display: "flex", maxWidth: "330px" }}>
            <input
              type="email"
              placeholder="Enter Your Email"
              style={{
                flex: 1,
                padding: "0.8rem 1rem",
                background: "#3a3a3a",
                border: "none",
                color: "#fff",
                outline: "none"
              }}
            />
            <button style={{
              background: "#c19a5b",
              color: "#fff",
              border: "none",
              padding: "0 1.5rem",
              fontWeight: 700,
              letterSpacing: "1px",
              cursor: "pointer"
            }}>
              SUBMIT
            </button>
          </div>

          {/* Payment icons */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            {["PayPal", "VISA", "Master", "AMEX"].map(p => (
              <div key={p} style={{
                background: "#fff", color: "#2b2b2b", fontSize: "0.65rem",
                padding: "0.3rem 0.5rem", borderRadius: "3px", fontWeight: 700
              }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.3rem" }}>Navigation</h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1rem" }}></div>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2.2, fontSize: "0.9rem" }}>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/trips", label: "Destination" },
              { to: "/trips", label: "Tour" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact us" },
            ].map(item => (
              <li key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: "#c19a5b" }}>▪</span>
                <Link to={item.to} style={{ color: "#e8e8e8", textDecoration: "none" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Help */}
        <div>
          <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.3rem" }}>Need Help ?</h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1rem" }}></div>

          {[
            { label: "Call Us", value: "+123 456 7890" },
            { label: "Email for Us", value: "holidayplanners@gmail.com" },
            { label: "Location", value: "Main Street, Victoria 8007." },
          ].map(item => (
            <div key={item.label} style={{
              borderLeft: "3px solid #c19a5b",
              paddingLeft: "0.8rem",
              marginBottom: "1rem"
            }}>
              <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>{item.label}</div>
              <div style={{ color: "#fff", fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}

          <div style={{ borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem" }}>
            <div style={{ fontSize: "0.8rem", opacity: 0.75, marginBottom: "0.3rem" }}>Follow us</div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <a href="#" style={{ color: "#fff" }}>f</a>
              <a href="#" style={{ color: "#fff" }}>📷</a>
              <a href="#" style={{ color: "#fff" }}>🐦</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #444",
        padding: "1.2rem 4rem",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.85rem",
        opacity: 0.8
      }}>
        <div>
          Copyright © {new Date().getFullYear()} <span style={{ color: "#c19a5b" }}>Geek Code Lab.</span> All Rights Reserved.
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Privacy Policy</a>
          <span>|</span>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Terms of Use</a>
          <span>|</span>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}