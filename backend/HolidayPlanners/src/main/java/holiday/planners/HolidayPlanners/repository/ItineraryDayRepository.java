package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.ItenaryDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItineraryDayRepository extends JpaRepository<ItenaryDay, UUID> {

    List<ItenaryDay> findByTourIdOrderByDayNumberAsc(UUID tourId);
}