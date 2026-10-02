

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";

const MAP_BG = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22500%22 viewBox=%220 0 800 500%22><g fill=%22none%22 stroke=%22%23333333%22 stroke-width=%220.8%22><path d=%22M-50 250 Q 100 150 250 200 T 500 180 T 850 230%22/><path d=%22M-50 300 Q 100 200 250 250 T 500 230 T 850 280%22/><path d=%22M-50 200 Q 100 100 250 150 T 500 130 T 850 180%22/><path d=%22M-50 350 Q 100 250 250 300 T 500 280 T 850 330%22/><path d=%22M-50 150 Q 100 50 250 100 T 500 80 T 850 130%22/></g></svg>')";

const payments = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", alt: "PayPal" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png", alt: "Visa" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", alt: "Mastercard" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg", alt: "Amex" },
];

export default function Footer() {
  const help = [
    { label: "Call Us", value: "+123 456 7890" },
    { label: "Email for Us", value: "holidayplanners@gmail.com" },
    { label: "Location", value: "Main Street, Victoria 8007." },
  ];

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/trips", label: "Destination" },
    { to: "/trips", label: "Tour" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact us" },
  ];

  return (
    <footer style={{
      background: "#252525",
      backgroundImage: MAP_BG,
      backgroundSize: "900px auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#d8d8d8",
      fontFamily: "sans-serif"
    }}>
      {/* Main grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1.5fr",
        gap: "4rem",
        padding: "4.5rem 6rem 4rem",
        maxWidth: "1250px",
        margin: "0 auto"
      }}>
        {/* Column 1: Brand + newsletter + payments */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.6rem" }}>
            <FaMapMarkerAlt style={{ color: "#c19a5b", fontSize: "2.1rem" }} />
            <span style={{ fontWeight: 700, fontSize: "1.55rem", color: "#fff", letterSpacing: "0.3px" }}>
              Holiday <span style={{ color: "#c19a5b" }}>Planners</span>
            </span>
          </div>

          <p style={{
            lineHeight: 1.9, fontSize: "0.92rem",
            color: "#c8c8c8", marginBottom: "2rem", maxWidth: "380px"
          }}>
            Holiday Planners sit amet consectetur adipisicing elit.
            Perferendis sapiente explicabo fugit, sit mollitia eum atque
            excepturi quaerat autem.
          </p>

          {/* Newsletter */}
          <div style={{
            display: "flex", maxWidth: "350px",
            borderRadius: "6px", overflow: "hidden"
          }}>
            <input
              type="email"
              placeholder="Enter Your Email"
              style={{
                flex: 1,
                padding: "0.9rem 1rem",
                background: "#3a3a3a",
                border: "none",
                color: "#fff",
                outline: "none",
                fontSize: "0.88rem"
              }}
            />
            <button className="btn-gold" style={{
              padding: "0 1.7rem",
              fontWeight: 700,
              letterSpacing: "1px",
              fontSize: "0.82rem"
            }}>
              SUBMIT
            </button>
          </div>

          {/* Payment logos (real, colored) */}
          <div style={{
            display: "flex",
            gap: "0.6rem",
            marginTop: "1.6rem",
            alignItems: "center"
          }}>
            {payments.map(p => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                style={{
                  height: "26px",
                  width: "auto",
                  objectFit: "contain",
                  background: "#fff",
                  padding: "3px 6px",
                  borderRadius: "3px"
                }}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 style={{
            color: "#fff", fontSize: "1.35rem",
            fontWeight: 600, marginBottom: "1rem"
          }}>
            Navigation
          </h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1.3rem" }}></div>
          <ul style={{
            listStyle: "none", padding: 0, margin: 0,
            lineHeight: 2.4, fontSize: "0.92rem"
          }}>
            {navLinks.map(item => (
              <li key={item.label} style={{
                display: "flex", alignItems: "center", gap: "0.75rem"
              }}>
                <span style={{ color: "#c19a5b", fontSize: "0.85rem", lineHeight: 1 }}>▪</span>
                <Link to={item.to} style={{ color: "#d8d8d8", textDecoration: "none" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Need Help */}
        <div>
          <h3 style={{
            color: "#fff", fontSize: "1.35rem",
            fontWeight: 600, marginBottom: "1rem"
          }}>
            Need Help ?
          </h3>
          <div style={{ borderTop: "1px solid #444", marginBottom: "1.3rem" }}></div>

          {help.map(item => (
            <div key={item.label} style={{
              borderLeft: "3px solid #c19a5b",
              paddingLeft: "1rem",
              marginBottom: "1.1rem"
            }}>
              <div style={{ fontSize: "0.82rem", color: "#b0b0b0", marginBottom: "0.15rem" }}>
                {item.label}
              </div>
              <div style={{ color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>
                {item.value}
              </div>
            </div>
          ))}

          <div style={{ borderLeft: "3px solid #c19a5b", paddingLeft: "1rem" }}>
            <div style={{ fontSize: "0.82rem", color: "#b0b0b0", marginBottom: "0.5rem" }}>
              Follow us
            </div>
            <div style={{ display: "flex", gap: "1rem", fontSize: "1rem" }}>
              <a href="#" style={{ color: "#fff" }}><FaFacebookF /></a>
              <a href="#" style={{ color: "#fff" }}><FaInstagram /></a>
              <a href="#" style={{ color: "#fff" }}><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #3a3a3a" }}>
        <div style={{
          padding: "1.4rem 6rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.87rem",
          color: "#c8c8c8",
          maxWidth: "1250px",
          margin: "0 auto"
        }}>
          <div>
            Copyright © {new Date().getFullYear()}{" "}
            <span style={{ color: "#c19a5b", fontWeight: 600 }}>Geek Code Lab.</span>{" "}
            All Rights Reserved.
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>Privacy Policy</a>
            <span style={{ color: "#555" }}>|</span>
            <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>Terms of Use</a>
            <span style={{ color: "#555" }}>|</span>
            <a href="#" style={{ color: "#c8c8c8", textDecoration: "none" }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}