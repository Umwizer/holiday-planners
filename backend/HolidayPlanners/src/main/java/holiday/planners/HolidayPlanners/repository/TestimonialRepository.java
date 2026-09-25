package holiday.planners.HolidayPlanners.repository;

import holiday.planners.HolidayPlanners.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TestimonialRepository extends JpaRepository<Testimonial, UUID> {
    // findAll(), findById(), save(), deleteById() cover the current needs
}