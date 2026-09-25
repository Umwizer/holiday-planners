package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.Booking;
import holiday.planners.HolidayPlanners.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/trips/{tripId}/bookings")
    public List<Booking> getBookingsForTrip(@PathVariable UUID tripId) {
        return bookingService.getBookingsForTrip(tripId);
    }

    @PostMapping("/trips/{tripId}/bookings")
    public ResponseEntity<Booking> createBooking(@PathVariable UUID tripId, @RequestBody Booking booking) {
        Booking created = bookingService.createBooking(tripId, booking);
        return ResponseEntity.ok(created);
    }

    @PatchMapping("/bookings/{bookingId}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable UUID bookingId,
                                                  @RequestParam Booking.BookingStatus status) {
        Booking updated = bookingService.updateStatus(bookingId, status);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable UUID bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.noContent().build();
    }
}