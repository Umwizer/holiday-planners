package holiday.planners.HolidayPlanners.model;

import java.util.*;
import jakarta.persistence.*;
@Entity
    
public class Trip{
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        private String title;
        private String destination;
        private Double price;
        @OneToMany(mappedBy = "trip")
        private List <TourImage> tourImage;
        @OneToMany(mappedBy = "trip")
        private List <Booking> booking;
        @OneToMany(mappedBy ="trip")
        private List <ItenaryDay> itenary;
        public Trip(UUID id, String title, String destination, Double price, List<TourImage> tourImage) {
            this.id = id;
            this.title = title;
            this.destination = destination;
            this.price = price;
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
        public List<TourImage> getTourImage() {
            return tourImage;
        }
        public void setTourImage(List<TourImage> tourImage) {
            this.tourImage = tourImage;
        }
          
} 

