package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.security.JwtService;
import holiday.planners.HolidayPlanners.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Admin Auth", description = "Admin login and registration")
public class AdminController {

    private final AdminService adminService;
    private final JwtService jwtService;
    private final String inviteCode;

    public AdminController(AdminService adminService,
                           JwtService jwtService,
                           @Value("${app.admin.invite-code:}") String inviteCode) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.inviteCode = inviteCode;
    }

    // ==================== LOGIN ====================

    @Operation(summary = "Log in as admin and receive a JWT token")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return adminService.authenticate(request.getUserName(), request.getPassword())
                .<ResponseEntity<?>>map(admin -> ResponseEntity.ok(
                        new LoginResponse(jwtService.generateToken(admin.getUserName()), "Bearer")))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid username or password"));
    }

    // ==================== REGISTER ====================

    @Operation(summary = "Register a new admin (requires the invite code)")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        boolean codeConfigured = inviteCode != null && !inviteCode.isBlank();
        boolean codeMatches = codeConfigured
                && request.getInviteCode() != null
                && MessageDigest.isEqual(
                        inviteCode.getBytes(StandardCharsets.UTF_8),
                        request.getInviteCode().getBytes(StandardCharsets.UTF_8));

        if (!codeMatches) {
            return ResponseEntity.status(403).body("Invalid invite code");
        }
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            return ResponseEntity.badRequest().body("Password must be at least 8 characters");
        }

        try {
            adminService.register(request.getUserName(), request.getEmail(), request.getPassword());
            return ResponseEntity.status(201).body("Admin registered. You can now log in.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    // ==================== DTOs ====================

    public static class LoginRequest {
        private String userName;
        private String password;

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String userName;
        private String email;
        private String password;
        private String inviteCode;

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getInviteCode() { return inviteCode; }
        public void setInviteCode(String inviteCode) { this.inviteCode = inviteCode; }
    }

    public record LoginResponse(String token, String type) {
    }
}