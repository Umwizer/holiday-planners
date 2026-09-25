package holiday.planners.HolidayPlanners.service;

import holiday.planners.HolidayPlanners.model.Admin;
import holiday.planners.HolidayPlanners.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin findByUserName(String username) {
        return adminRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found: " + username));
    }
}