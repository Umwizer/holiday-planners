package holiday.planners.HolidayPlanners.model;

import java.util.*;
import jakarta.persistence.*;

@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String destination;
    private Double price;
    private Integer discountPercent;
    private Integer durationDays;

    @OneToMany(mappedBy = "trip")
    private List<TripImage> tourImage;

    @OneToMany(mappedBy = "trip")
    private List<Booking> booking;

    @OneToMany(mappedBy = "trip")
    private List<ItenaryDay> itenary;

    public Trip() {
    }

    public Trip(UUID id, String title, String description, String destination, Double price,
                Integer discountPercent, Integer durationDays, List<TripImage> tourImage) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.destination = destination;
        this.price = price;
        this.discountPercent = discountPercent;
        this.durationDays = durationDays;
        this.tourImage = tourImage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Integer discountPercent) {
        this.discountPercent = discountPercent;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public List<TripImage> getTourImage() {
        return tourImage;
    }

    public void setTourImage(List<TripImage> tourImage) {
        this.tourImage = tourImage;
    }

    public List<Booking> getBooking() {
        return booking;
    }

    public void setBooking(List<Booking> booking) {
        this.booking = booking;
    }

    public List<ItenaryDay> getItenary() {
        return itenary;
    }

    public void setItenary(List<ItenaryDay> itenary) {
        this.itenary = itenary;
    }
}