const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

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