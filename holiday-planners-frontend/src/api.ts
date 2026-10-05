const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request(
  path: string,
  opts: { method?: string; body?: unknown; auth?: boolean } = {}
) {
  const { method = "GET", body, auth = false } = opts;
  const token = localStorage.getItem("adminToken");

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch only throws when the browser blocks it (usually CORS) or the server is down
    throw new Error("Cannot reach the server. Check that it is running and that CORS allows this method.");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${text || res.statusText || "Request failed"}`);
  }

  // Some endpoints (DELETE, PATCH) return an empty body. Calling res.json() on
  // an empty body throws, so read it as text first.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/* ---------- Public ---------- */
export const getTrips = () => request("/api/trips");
export const getTrip = (id: string | number) => request(`/api/trips/${id}`);
export const getTestimonials = () => request("/api/testimonials");

export const createBooking = (
  tripId: string,
  data: {
    customerName: string;
    email: string;
    phone: string;
    travelDate: string;
    numberOfPeople: number;
  }
) =>
  request(`/api/trips/${tripId}/bookings`, {
    method: "POST",
    body: { ...data, status: "PENDING" },
  });

/* ---------- Admin: bookings ---------- */
export const getBookings = () => request("/api/bookings", { auth: true });

export const updateBookingStatus = (bookingId: string, status: string) =>
  request(`/api/bookings/${bookingId}/status`, {
    method: "PATCH",
    body: { status },
    auth: true,
  });

export const deleteBooking = (bookingId: string) =>
  request(`/api/bookings/${bookingId}`, { method: "DELETE", auth: true });

/* ---------- Admin: trips ---------- */
export const createTrip = (data: any) =>
  request("/api/trips", { method: "POST", body: data, auth: true });

export const updateTrip = (id: string, data: any) =>
  request(`/api/trips/${id}`, { method: "PUT", body: data, auth: true });

export const deleteTrip = (id: string) =>
  request(`/api/trips/${id}`, { method: "DELETE", auth: true });

export const createTestimonial = (data: any) =>
  request("/api/testimonials", { method: "POST", body: data, auth: true });

export const deleteTestimonial = (id: string) =>
  request(`/api/testimonials/${id}`, { method: "DELETE", auth: true });