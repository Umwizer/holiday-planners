package holiday.planners.HolidayPlanners.services;

import holiday.planners.HolidayPlanners.model.Booking;
import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.repository.BookingRepository;
import holiday.planners.HolidayPlanners.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TripRepository tripRepository;

    public BookingService(BookingRepository bookingRepository, TripRepository tripRepository) {
        this.bookingRepository = bookingRepository;
        this.tripRepository = tripRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsForTrip(UUID tripId) {
        return bookingRepository.findByTripId(tripId);
    }

    public Booking createBooking(UUID tripId, Booking booking) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found: " + tripId));
        booking.setTrip(trip);
        booking.setStatus(Booking.BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    public Booking updateStatus(UUID bookingId, Booking.BookingStatus status) {
        Booking existing = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        existing.setStatus(status);
        return bookingRepository.save(existing);
    }

    public void deleteBooking(UUID bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}