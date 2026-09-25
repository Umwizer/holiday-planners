package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TourRepository extends JpaRepository<Trip, UUID> {
    List<Trip> findByDestinationContainingIgnoreCase(String destination);
}