import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Trips from "./pages/Trips";
import TourDetails from "./pages/TourDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomePage = Home as unknown as () => ReactElement;
const AboutPage = About as unknown as () => ReactElement;
const TripsPage = Trips as unknown as () => ReactElement;
const TourDetailsPage = TourDetails as unknown as () => ReactElement;

function App(): ReactElement {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TourDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;