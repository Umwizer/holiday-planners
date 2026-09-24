package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;
@Entity
public class Admin {
    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID Id;
    private String email;
    private String userName;
    @Column(name = "password" , nullable = false, length=8)
    private String password;
    public Admin(UUID id, String email, String userName, String password) {
        Id = id;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }
    
    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        Id = id;
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
        return "Admin [Id=" + Id + ", email=" + email + ", userName=" + userName + ", password=" + password
                + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
                + "]";
    }
    
    
}
