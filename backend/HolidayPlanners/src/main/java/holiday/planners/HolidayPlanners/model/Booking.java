package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String customerName;
    private String email;
    private String phone;
    private Date travelDate;
    private Integer numberOfPeople;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }

    public Booking() {
    }

    public Booking(UUID id, String customerName, String email, String phone, Date travelDate,
                    Integer numberOfPeople, BookingStatus status, Trip trip) {
        this.id = id;
        this.customerName = customerName;
        this.email = email;
        this.phone = phone;
        this.travelDate = travelDate;
        this.numberOfPeople = numberOfPeople;
        this.status = status;
        this.trip = trip;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(Date travelDate) {
        this.travelDate = travelDate;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}