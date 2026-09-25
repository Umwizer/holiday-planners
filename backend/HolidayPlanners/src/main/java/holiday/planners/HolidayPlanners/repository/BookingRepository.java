package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    List<Booking> findByTripId(UUID tripId);
    List<Booking> findByStatus(Booking.BookingStatus status); 
}