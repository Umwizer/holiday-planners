package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.ItineraryDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItineraryDayRepository extends JpaRepository<ItineraryDay, UUID> {
  List<ItineraryDay> findByTourIdOrderByDayNumberAsc(UUID tourId);
}