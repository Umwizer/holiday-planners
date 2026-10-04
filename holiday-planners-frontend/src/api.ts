const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

/* ---------- Public ---------- */
export async function getTrips() {
  const res = await fetch(`${API_BASE}/api/trips`);
  if (!res.ok) throw new Error("Failed to load trips");
  return res.json();
}

export async function getTrip(id: string | number) {
  const res = await fetch(`${API_BASE}/api/trips/${id}`);
  if (!res.ok) throw new Error("Failed to load trip");
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API_BASE}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to load testimonials");
  return res.json();
}

/* ---------- Admin (JWT) ---------- */
export async function getBookings() {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/bookings`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}