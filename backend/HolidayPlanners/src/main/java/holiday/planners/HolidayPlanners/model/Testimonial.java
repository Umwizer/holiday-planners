package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.*;

@Entity
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String customerName;

    @Min(1)
    @Max(5)
    private Integer rating;

    private String quote;
    private String photoUrl;
    private String source;

    public Testimonial() {
    }

    public Testimonial(UUID id, String customerName, Integer rating, String quote, String photoUrl, String source) {
        this.id = id;
        this.customerName = customerName;
        this.rating = rating;
        this.quote = quote;
        this.photoUrl = photoUrl;
        this.source = source;
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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}