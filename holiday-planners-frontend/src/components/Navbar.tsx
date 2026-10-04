import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter,
  FaSearch, FaTimes,
} from "react-icons/fa";
import Logo from "./Logo";

// Edit these to match your routes
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/trips", label: "Trips" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin/login", label: "Admin" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  // Esc closes, and the page behind doesn't scroll while something is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  // Goes to /trips?search=... (read it on the Trips page with useSearchParams)
  const runSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/trips?search=${encodeURIComponent(q)}`);
    setQuery("");
    closeAll();
  };

  return (
    <header className="nav-header">
      {/* Top bar */}
      <div className="nav-top-bar">
        <div className="nav-top-inner">
          <div className="nav-contacts">
            <span><FaRegEnvelope /> holidayplanners@gmail.com</span>
            <span className="nav-phone"><FaPhoneAlt /> +123 456 7890</span>
          </div>
          <div className="nav-socials">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Main nav (floating card) */}
      <nav className="nav-main">
        <Link to="/" className="nav-logo" onClick={closeAll}>
          <Logo />
        </Link>

        <div className="nav-actions">
          <Link to="/admin/login" className="nav-admin">ADMIN</Link>
          <Link to="/trips" className="btn-gold nav-reserve">RESERVE</Link>
          <button
            aria-label="Search"
            className="nav-search-btn"
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
          >
            <FaSearch />
          </button>
          <button
            aria-label="Open menu"
            className="nav-menu-btn"
            onClick={() => { setSearchOpen(false); setMenuOpen(true); }}
          >
            <span className="burger"><i /><i /><i /></span>
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      <div className={`search-overlay ${searchOpen ? "open" : ""}`} onClick={closeAll}>
        <button className="overlay-close" aria-label="Close search" onClick={closeAll}>
          <FaTimes />
        </button>
        <form className="search-overlay-form" onClick={(e) => e.stopPropagation()} onSubmit={runSearch}>
          <input
            ref={searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trips, destinations..."
            aria-label="Search"
          />
          <button type="submit" className="btn-gold" aria-label="Submit search"><FaSearch /></button>
        </form>
      </div>

      {/* Menu drawer */}
      <div className={`menu-backdrop ${menuOpen ? "open" : ""}`} onClick={closeAll} />
      <aside className={`menu-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="menu-close" aria-label="Close menu" onClick={closeAll}>
          <FaTimes />
        </button>

        <div className="menu-logo"><Logo /></div>

        <form className="menu-search" onSubmit={runSearch}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            aria-label="Search"
          />
          <button type="submit" aria-label="Submit search"><FaSearch /></button>
        </form>

        <ul className="menu-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={closeAll}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="menu-info">
          <span><FaRegEnvelope /> holidayplanners@gmail.com</span>
          <span><FaPhoneAlt /> +123 456 7890</span>
        </div>
        <div className="menu-socials">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </aside>
    </header>
  );
}