import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaFlag } from "react-icons/fa";
import TrendingTours from "../components/TrendingTours";
import Testimonials from "../components/Testimonial";
const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero slideshow */}
      <section style={{
        position: "relative", height: "75vh", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {heroImages.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url(${img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.5s ease-in-out"
          }} />
        ))}

        <h1 style={{
          position: "relative", zIndex: 1,
          color: "#fff", fontFamily: "Georgia, serif",
          fontSize: "3.5rem", textAlign: "center",
          maxWidth: "900px", lineHeight: 1.3, textShadow: "0 2px 12px rgba(0,0,0,0.4)"
        }}>
          Enjoy The Travel With<br />
          <span style={{
            background: "#c19a5b", padding: "0.3rem 1rem",
            display: "inline-block", marginTop: "1rem"
          }}>
            Holiday Planners
          </span>
        </h1>
      </section>

      {/* Search bar */}
      <section style={{
        background: "#fff", display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 1.5fr auto",
        gap: "1rem", maxWidth: "1150px",
        margin: "-55px auto 5rem", padding: "1.5rem",
        position: "relative", zIndex: 2,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaMapMarkerAlt style={{ color: "#c19a5b" }} />
          <input placeholder="Where To?" style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaCalendarAlt style={{ color: "#c19a5b" }} />
          <select style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none", background: "transparent" }}>
            <option>When?</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid #ddd", padding: "0 1rem" }}>
          <FaFlag style={{ color: "#c19a5b" }} />
          <select style={{ flex: 1, padding: "0.9rem 0", border: "none", outline: "none", background: "transparent" }}>
            <option>Travel Type</option>
          </select>
        </div>
        <button className="btn-gold" style={{ padding: "0.9rem 2rem", fontWeight: 700, letterSpacing: "1px" }}>
          FIND NOW
        </button>
      </section>

      {/* Plan Your Trip with Us */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
        maxWidth: "1200px", margin: "0 auto 6rem", padding: "0 2rem", alignItems: "center"
      }}>
        <div style={{ position: "relative", height: "480px" }}>
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
            alt="Travel"
            style={{
              width: "70%", height: "80%", objectFit: "cover",
              border: "3px solid #c19a5b",
              position: "absolute", top: 0, right: 0
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
            alt="Traveler"
            style={{
              width: "55%", height: "55%", objectFit: "cover",
              border: "3px solid #c19a5b",
              position: "absolute", bottom: 0, left: 0,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
          />
        </div>

        <div>
          <p style={{
            color: "#c19a5b", marginBottom: "0.8rem",
            borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
            fontSize: "0.95rem", fontWeight: 500
          }}>
            About us
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "2.6rem",
            marginBottom: "1.5rem", color: "#2b2b2b", lineHeight: 1.3
          }}>
            Plan Your Trip with Us
          </h2>
          <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "1rem" }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
            right at the coast of the Semantics, a large language ocean. A small river named
            Duden flows by their place and supplies it with the necessary regelialia.
          </p>
          <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "2rem" }}>
            It is a paradisematic country, in which roasted parts of sentences fly into your
            mouth. Even the all-powerful Pointing has no control about the blind texts it is
            an almost unorthographic.
          </p>
          <Link to="/about" className="btn-gold" style={{
            display: "inline-block", padding: "0.9rem 2rem",
            textDecoration: "none", fontWeight: 700, letterSpacing: "1px", fontSize: "0.85rem"
          }}>
            READ MORE
          </Link>
        </div>
      </section>

      {/* Amazing Destination */}
      <section style={{
        padding: "4rem 2rem",
        background: "#fafafa",
        backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><path d=%22M0 100 Q 50 50 100 100 T 200 100%22 fill=%22none%22 stroke=%22%23eee%22 stroke-width=%221%22/></svg>')",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{
            color: "#c19a5b", marginBottom: "0.8rem",
            borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem",
            fontSize: "0.95rem", fontWeight: 500
          }}>
            Amazing Destination
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "2.6rem",
            marginBottom: "3rem", color: "#2b2b2b", lineHeight: 1.3, maxWidth: "600px"
          }}>
            Choose The Destination Just Right For Your <strong>Vacation</strong>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem"
          }}>
            {[
              { name: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800" },
              { name: "Switzerland", img: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?w=800" },
              { name: "India", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800" },
            ].map(dest => (
              <div key={dest.name} style={{
                position: "relative", height: "420px", overflow: "hidden",
                cursor: "pointer"
              }}>
                <img
                  src={dest.img}
                  alt={dest.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s"
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{
                  position: "absolute", bottom: "30px", left: "30px",
                  background: "#fff", padding: "0.8rem 1.5rem",
                  fontFamily: "Georgia, serif", fontSize: "1.4rem",
                  color: "#2b2b2b", boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
                }}>
                  {dest.name}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/trips" className="btn-gold" style={{
              display: "inline-block", padding: "0.9rem 2.5rem",
              textDecoration: "none", fontWeight: 700, letterSpacing: "1px", fontSize: "0.85rem"
            }}>
              VIEW ALL
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Tours */}
      <TrendingTours />
      <Testimonials />
    </>
  );
}