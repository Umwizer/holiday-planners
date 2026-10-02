import { FaBus, FaGlobe, FaHotel, FaUserClock, FaCheck } from "react-icons/fa";

const features = [
  { icon: <FaBus />, title: "Private Transport", desc: "Far far away, behind the word mountains, far from the countries Vokalia." },
  { icon: <FaGlobe />, title: "Diverse Destinations", desc: "Far far away, behind the word mountains, far from the countries Vokalia." },
  { icon: <FaHotel />, title: "Great Hotels", desc: "Far far away, behind the word mountains, far from the countries Vokalia." },
  { icon: <FaUserClock />, title: "Fast Booking", desc: "Far far away, behind the word mountains, far from the countries Vokalia." },
];

const skills = [
  { label: "Accomodation", value: 80 },
  { label: "Destination", value: 95 },
  { label: "Meals", value: 67 },
  { label: "Transport", value: 87 },
];

const checkItems = [
  "Far far away, behind the word mountains.",
  "countries Vokalia and Consonantia, there live.",
  "Separated they live in Bookmarksgrove right.",
  "the coast of the Semantics.",
  "word mountains, far from the countries Vokalia.",
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative", height: "55vh",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <h1 style={{
          color: "#fff", fontFamily: "Georgia, serif",
          fontSize: "4rem", textShadow: "0 2px 12px rgba(0,0,0,0.5)"
        }}>About Us</h1>
      </section>

      {/* Feature cards overlapping */}
      <section style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem", maxWidth: "1200px",
        margin: "-70px auto 4rem", padding: "0 1rem", position: "relative", zIndex: 2
      }}>
        {features.map(f => (
          <div key={f.title} style={{
            background: "#fff", padding: "2rem 1.5rem", textAlign: "center",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)", borderRadius: "4px"
          }}>
            <div style={{ fontSize: "2.5rem", color: "#c19a5b", marginBottom: "1rem" }}>{f.icon}</div>
            <h3 style={{ marginBottom: "0.8rem", fontSize: "1.15rem" }}>{f.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Plan Your Trip with Us */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem",
        maxWidth: "1200px", margin: "0 auto 5rem", padding: "0 1rem", alignItems: "center"
      }}>
        <div>
          <p style={{ color: "#c19a5b", marginBottom: "0.6rem", borderLeft: "3px solid #c19a5b", paddingLeft: "0.8rem" }}>
            About us
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            Plan Your Trip with Us
          </h2>
          <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1rem" }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
            right at the coast of the Semantics, a large language ocean. A small river named
            Duden flows by their place and supplies it with the necessary regelialia.
          </p>
          <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
            The Big Oxmox advised her not to do so, because there were thousands of bad Commas,
            wild Question Marks and devious Semikoli, but the Little Blind Text didn't listen.
          </p>
          <a href="#" className="btn-hover" style={{
            display: "inline-block", background: "#c19a5b", color: "#fff",
            padding: "0.9rem 2rem", textDecoration: "none",
            fontWeight: 700, letterSpacing: "1px", transition: "background 0.3s"
          }}>READ MORE</a>
        </div>
        <div style={{ position: "relative", height: "450px" }}>
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
            style={{ width: "75%", height: "80%", objectFit: "cover", border: "4px solid #c19a5b", position: "absolute", top: 0, right: 0 }} />
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
            style={{ width: "60%", height: "60%", objectFit: "cover", border: "4px solid #c19a5b", position: "absolute", bottom: 0, left: 0 }} />
        </div>
      </section>

      {/* Alphabet Village - image left */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        maxWidth: "1200px", margin: "0 auto 5rem", padding: "0 1rem", alignItems: "center"
      }}>
        <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"
          style={{ width: "100%", height: "450px", objectFit: "cover" }} />
        <div style={{ padding: "0 2rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", marginBottom: "1.2rem" }}>
            Bookmarksgrove, the headline of Alphabet <strong>Village</strong> subline.
          </h2>
          <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {checkItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                <span style={{
                  background: "#c19a5b", color: "#fff", width: "22px", height: "22px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "0.75rem"
                }}><FaCheck /></span>
                <span style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress bars */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
        maxWidth: "1200px", margin: "0 auto 5rem", padding: "0 1rem"
      }}>
        <div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", marginBottom: "1.5rem" }}>
            The headline of <strong>Alphabet</strong> subline.
          </h2>
          <p style={{ color: "#555", lineHeight: 1.8 }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
            right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
        <div>
          {skills.map(s => (
            <div key={s.label} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontWeight: 600 }}>
                <span>{s.label}</span>
                <span>{s.value}%</span>
              </div>
              <div style={{ background: "#eaeaea", height: "8px" }}>
                <div style={{ background: "#c19a5b", height: "100%", width: `${s.value}%`, transition: "width 1s" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section - text left, image right */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        maxWidth: "1200px", margin: "0 auto 5rem", padding: "0 1rem", alignItems: "center"
      }}>
        <div style={{ paddingRight: "2rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", marginBottom: "1.2rem" }}>
            Bookmarksgrove, <strong>the headline</strong> of Alphabet Village subline.
          </h2>
          <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {checkItems.slice(0, 4).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                <span style={{
                  background: "#c19a5b", color: "#fff", width: "22px", height: "22px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "0.75rem"
                }}><FaCheck /></span>
                <span style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
          style={{ width: "100%", height: "450px", objectFit: "cover" }} />
      </section>
    </>
  );
}