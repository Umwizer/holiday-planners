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
/* ---------- Trips (admin CRUD) ---------- */
export async function createTrip(data: any) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create trip");
  return res.json();
}

export async function updateTrip(id: string, data: any) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/trips/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update trip");
  return res.json();
}

export async function deleteTrip(id: string) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/trips/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to delete trip");
}

/* ---------- Testimonials (admin CRUD) ---------- */
export async function createTestimonial(data: any) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create testimonial");
  return res.json();
}

export async function deleteTestimonial(id: string) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/testimonials/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to delete testimonial");
}