package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.TripImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TripImageRepository extends JpaRepository<TripImage, UUID> {

    List<TripImage> findByTourId(UUID tourId);
}