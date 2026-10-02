import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";

const MAP_BG = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22 viewBox=%220 0 600 400%22><g fill=%22none%22 stroke=%22%233a3a3a%22 stroke-width=%221%22 opacity=%220.7%22><path d=%22M-50 200 Q 80 120 180 180 T 400 150 T 650 220%22/><path d=%22M-50 240 Q 80 160 180 220 T 400 190 T 650 260%22/><path d=%22M-50 160 Q 80 80 180 140 T 400 110 T 650 180%22/><path d=%22M100 -50 Q 180 60 260 20 T 460 80 T 700 40%22/><path d=%22M100 450 Q 180 340 260 380 T 460 320 T 700 360%22/><path d=%22M-20 320 Q 60 260 150 300 T 350 280 T 620 340%22/></g></svg>')";

export default function Footer() {
  const help = [
    { label: "Call Us", value: "+123 456 7890" },
    { label: "Email for Us", value: "holidayplanners@gmail.com" },
    { label: "Location", value: "Main Street, Victoria 8007." },
  ];

  return (
    <footer style={{
      background: "#2b2b2b",
      backgroundImage: MAP_BG,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#e8e8e8",
      position: "relative"
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr",
        gap: "3rem", padding: "3.5rem 4rem", maxWidth: "1300px", margin: "0 auto"
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.4rem" }}>
            <FaMapMarkerAlt style={{ color: "#c19a5b", fontSize: "2rem" }} />
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#fff" }}>
              Holiday <span style={{ color: "#c19a5b" }}>Planners</span>
            </span>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: "0.9rem", opacity: 0.85, marginBottom: "1.8rem" }}>
            Holiday Planners sit amet consectetur adipisicing elit. Perferendis
            sapiente explicabo fugit, sit mollitia eum atque excepturi quaerat autem.
          </p>

          <div style={{ display: "flex", maxWidth: "340px" }}>
            <input type="email" placeholder="Enter Your Email" style={{
              flex: 1, padding: "0.85rem 1rem", background: "#3a3a3a",
              border: "none", color: "#fff", outline: "none", fontSize: "0.9rem"
            }} />
            <button className="btn-gold" style={{
              padding: "0 1.6rem", fontWeight: 700, letterSpacing: "1px", fontSize: "0.85rem"
            }}>SUBMIT</button>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            {["PayPal", "VISA", "Master", "AMEX"].map(p => (
              <div key={p} style={{
                background: "#fff", color: "#2b2b2b", fontSize: "0.6rem",
                padding: "0.35rem 0.5rem", borderRadius: "3px", fontWeight: 700
              }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.3rem", fontWeight: 600 }}>
            Navigation
          </h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1.2rem" }}></div>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2.3, fontSize: "0.9rem" }}>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/trips", label: "Destination" },
              { to: "/trips", label: "Tour" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact us" },
            ].map(item => (
              <li key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <span style={{ color: "#c19a5b" }}>▪</span>
                <Link to={item.to} style={{ color: "#e8e8e8", textDecoration: "none" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.3rem", fontWeight: 600 }}>
            Need Help ?
          </h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1.2rem" }}></div>

          {help.map(item => (
            <div key={item.label} style={{
              borderLeft: "3px solid #c19a5b", paddingLeft: "0.9rem", marginBottom: "1rem"
            }}>
              <div style={{ fontSize: "0.8rem", opacity: 0.75, marginBottom: "0.2rem" }}>
                {item.label}
              </div>
              <div style={{ color: "#fff", fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}

          <div style={{ borderLeft: "3px solid #c19a5b", paddingLeft: "0.9rem" }}>
            <div style={{ fontSize: "0.8rem", opacity: 0.75, marginBottom: "0.4rem" }}>
              Follow us
            </div>
            <div style={{ display: "flex", gap: "0.9rem", fontSize: "1rem" }}>
              <a href="#" style={{ color: "#fff" }}><FaFacebookF /></a>
              <a href="#" style={{ color: "#fff" }}><FaInstagram /></a>
              <a href="#" style={{ color: "#fff" }}><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #444",
        padding: "1.3rem 4rem",
        display: "flex", justifyContent: "space-between",
        fontSize: "0.85rem", opacity: 0.85,
        maxWidth: "1300px", margin: "0 auto"
      }}>
        <div>
          Copyright © {new Date().getFullYear()} <span style={{ color: "#c19a5b" }}>Geek Code Lab.</span> All Rights Reserved.
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Privacy Policy</a><span>|</span>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Terms of Use</a><span>|</span>
          <a href="#" style={{ color: "#e8e8e8", textDecoration: "none" }}>Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}