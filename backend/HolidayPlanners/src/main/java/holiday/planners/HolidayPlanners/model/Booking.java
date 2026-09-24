package holiday.planners.HolidayPlanners.model;

import jakarta.persistence.*;
import java.util.*;
@Entity
public class Booking {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID) 
   private UUID Id;
   private String customerName;
   private String email;
   private String phone;
   private Date travelDate;
   private int numberOfStatus;
   public enum status {
    Pending,Confirmed,Cancelled
   }
   @ManyToOne
   @JoinColumn(name ="trip")
   private Trip trip;
   public Booking(UUID id, String customerName, String email, String phone, Date travelDate, int numberOfStatus,
         Trip trip) {
      Id = id;
      this.customerName = customerName;
      this.email = email;
      this.phone = phone;
      this.travelDate = travelDate;
      this.numberOfStatus = numberOfStatus;
      this.trip = trip;
   }
   public UUID getId() {
      return Id;
   }
   public void setId(UUID id) {
      Id = id;
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
   public int getNumberOfStatus() {
      return numberOfStatus;
   }
   public void setNumberOfStatus(int numberOfStatus) {
      this.numberOfStatus = numberOfStatus;
   }
   public Trip getTrip() {
      return trip;
   }
   public void setTrip(Trip trip) {
      this.trip = trip;
   }
   
   
}
