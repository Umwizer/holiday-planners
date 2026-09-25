package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String email;
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    public Admin() {
    }

    public Admin(UUID id, String email, String userName, String password) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin [id=" + id + ", email=" + email + ", userName=" + userName + "]";
    }
}