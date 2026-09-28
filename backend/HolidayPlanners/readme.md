
post /api/trips
{
  "title": "Krabi Island Escape",
  "description": "Five days of beaches and limestone cliffs.",
  "destination": "Thailand",
  "price": 970,
  "discountPercent": 32,
  "durationDays": 5
}
GET /api/trips  
GET /api/trips/{id}
POST /api/trips/{tripId}/images
POST /api/trips/{tripId}/itinerary
POST /api/trips/{tripId}/bookings
POST /api/testimonials
POST /api/auth/login