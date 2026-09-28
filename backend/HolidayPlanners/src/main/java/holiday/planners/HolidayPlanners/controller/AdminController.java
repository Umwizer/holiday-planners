package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.security.JwtService;
import holiday.planners.HolidayPlanners.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Admin Auth", description = "Admin login")
public class AdminController {

    private final AdminService adminService;
    private final JwtService jwtService;

    public AdminController(AdminService adminService, JwtService jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Log in as admin and receive a JWT token")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return adminService.authenticate(request.getUserName(), request.getPassword())
                .<ResponseEntity<?>>map(admin -> ResponseEntity.ok(
                        new LoginResponse(jwtService.generateToken(admin.getUserName()), "Bearer")))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid username or password"));
    }

    public static class LoginRequest {
        private String userName;
        private String password;

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public record LoginResponse(String token, String type) {
    }
}