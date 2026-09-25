package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.TourImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TourImageRepository extends JpaRepository<TourImage, UUID> {

    List<TourImage> findByTourId(UUID tourId);
}