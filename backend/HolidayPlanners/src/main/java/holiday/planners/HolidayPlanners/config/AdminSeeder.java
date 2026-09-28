package holiday.planners.HolidayPlanners.config;

import holiday.planners.HolidayPlanners.model.Admin;
import holiday.planners.HolidayPlanners.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:admin}")
    private String username;

    @Value("${app.admin.email:admin@holiday.com}")
    private String email;

    @Value("${app.admin.password:Admin@12345}")
    private String password;

    public AdminSeeder(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (adminRepository.findByUserName(username).isEmpty()) {
            Admin admin = new Admin();
            admin.setUserName(username);
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode(password));
            adminRepository.save(admin);
            System.out.println("Admin user created: " + username);
        }
    }
}