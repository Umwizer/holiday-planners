export default function Home() {
  return (
    <section style={{
      position: "relative",
      height: "70vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      paddingLeft: "5%"
    }}>
      <h1 style={{
        color: "rgba(255,255,255,0.85)",
        fontFamily: "Georgia, serif",
        fontSize: "4rem",
        maxWidth: "700px",
        lineHeight: 1.2
      }}>
        Life is Short and<br />The World is Wide.
      </h1>
    </section>
  );
}