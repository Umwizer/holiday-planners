import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomePage = Home as unknown as () => ReactElement;
const AboutPage = About as unknown as () => ReactElement;

function App(): ReactElement {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;