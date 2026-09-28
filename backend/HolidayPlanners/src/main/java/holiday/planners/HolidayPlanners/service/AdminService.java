package holiday.planners.HolidayPlanners.service;

import holiday.planners.HolidayPlanners.model.Admin;
import holiday.planners.HolidayPlanners.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin register(String userName, String email, String rawPassword) {
        if (adminRepository.existsByUserName(userName)) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (adminRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        Admin admin = new Admin();
        admin.setUserName(userName);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(rawPassword));
        return adminRepository.save(admin);
    }

    public Optional<Admin> authenticate(String userName, String rawPassword) {
        return adminRepository.findByUserName(userName)
                .filter(admin -> passwordEncoder.matches(rawPassword, admin.getPassword()));
    }
}