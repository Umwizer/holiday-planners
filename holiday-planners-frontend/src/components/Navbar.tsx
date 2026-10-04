import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter,
  FaSearch, FaMapMarkerAlt, FaTimes, FaChevronDown,
} from "react-icons/fa";

// const GOLD = "#c19a5b";

const MENU_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/trips", label: "Destination", hasChevron: true },
  { to: "/trips", label: "Tour", hasChevron: true },
  { to: "/contact", label: "Contact us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="nav-header">
        {/* Top dark bar */}
        <div className="nav-top-bar">
          <div className="nav-top-inner">
            <div className="nav-contacts">
              <span><FaEnvelope /> holidayplanners@gmail.com</span>
              <span className="nav-phone"><FaPhoneAlt /> +123 456 7890</span>
            </div>
            <div className="nav-socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>

        {/* White floating card */}
        <nav className="nav-main">
          <Link to="/" className="nav-logo">
            <FaMapMarkerAlt className="nav-logo-icon" />
            <span className="nav-logo-text">
              Holiday <b>Planners</b>
            </span>
          </Link>

          <div className="nav-actions">
            <Link to="/admin/login" className="nav-admin">ADMIN</Link>
            <Link to="/trips" className="btn-gold nav-reserve">RESERVE</Link>

            <button aria-label="Search" className="nav-search-btn">
              <FaSearch />
            </button>
            <button
              aria-label="Menu"
              className="nav-menu-btn"
              onClick={() => setMenuOpen(true)}
            >
              <span className="burger"><i /><i /><i /></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen dark menu overlay */}
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="menu-overlay-top">
          <Link to="/" className="menu-overlay-logo" onClick={() => setMenuOpen(false)}>
            <FaMapMarkerAlt />
            <span>Holiday <b>Planners</b></span>
          </Link>

          <button
            className="menu-overlay-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="menu-overlay-body">
          <ul className="menu-overlay-nav">
            {MENU_LINKS.map(item => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={isActive(item.to) ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  {item.hasChevron && <FaChevronDown className="chev" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-overlay-socials">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </>
  );
}