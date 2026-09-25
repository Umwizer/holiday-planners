package holiday.planners.HolidayPlanners.repository;


import holiday.planners.HolidayPlanners.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface AdminUserRepository extends JpaRepository<Admin, UUID> {
   Optional<Admin> findByUsername(String username);
}
