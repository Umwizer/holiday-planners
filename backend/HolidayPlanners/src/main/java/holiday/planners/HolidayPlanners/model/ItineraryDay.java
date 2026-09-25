package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;
@Entity
public class ItineraryDay {
  
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    
    private UUID Id;
    private int dayNumber;
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name ="trip_id")
    private Trip trip;

    public ItineraryDay(UUID id, int dayNumber, String title, String description, Trip trip) {
        Id = id;
        this.dayNumber = dayNumber;
        this.title = title;
        this.description = description;
        this.trip = trip;
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        Id = id;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
    
}
