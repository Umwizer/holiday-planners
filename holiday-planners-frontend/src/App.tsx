import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Trips from "./pages/Trips";
import TourDetails from "./pages/TourDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminTrips from "./pages/AdminTrips";
import Contact from "./pages/Contact";
import AdminTestimonials from "./pages/AdminTestimonials";
const HomePage = Home as unknown as () => ReactElement;
const ContactPage = Contact as unknown as () => ReactElement;
const AboutPage = About as unknown as () => ReactElement;
const TripsPage = Trips as unknown as () => ReactElement;
const TourDetailsPage = TourDetails as unknown as () => ReactElement;
const AdminLoginPage = AdminLogin as unknown as () => ReactElement;
const AdminRegisterPage = AdminRegister as unknown as () => ReactElement;
const AdminDashboardPage = AdminDashboard as unknown as () => ReactElement;
const AdminTripsPage = AdminTrips as unknown as () => ReactElement;
const AdminTestimonialsPage = AdminTestimonials as unknown as () => ReactElement;
function App(): ReactElement {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/admin/trips" element={
            <ProtectedRoute><AdminTripsPage /></ProtectedRoute>
        } />
      <Route path="/admin/testimonials" element={
        <ProtectedRoute><AdminTestimonialsPage /></ProtectedRoute>
      } />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TourDetailsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;