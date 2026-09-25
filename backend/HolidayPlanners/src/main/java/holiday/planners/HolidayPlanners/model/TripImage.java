package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class TripImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String imageCover;
    private Boolean isCover;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public TripImage() {
    }

    public TripImage(UUID id, String imageCover, Boolean isCover, Trip trip) {
        this.id = id;
        this.imageCover = imageCover;
        this.isCover = isCover;
        this.trip = trip;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getImageCover() {
        return imageCover;
    }

    public void setImageCover(String imageCover) {
        this.imageCover = imageCover;
    }

    public Boolean getIsCover() {
        return isCover;
    }

    public void setIsCover(Boolean isCover) {
        this.isCover = isCover;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}