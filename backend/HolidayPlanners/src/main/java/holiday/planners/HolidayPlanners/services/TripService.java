package holiday.planners.HolidayPlanners.services;

import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.repository.TripRepository;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class TripService{
     private final TripRepository tripRepository;

     public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
     }
     public List<Trip> getAllTrips(){
        return tripRepository.findAll();
     }
     public Trip getTripById(UUID id){
        return tripRepository.findById(id).orElseThrow(()->new RuntimeException("Trip not found"));
     }
     public List <Trip>searchByDestination(String destination){
        return tripRepository.findByDestinationContainingIgnoreCase(destination);
     }
     public Trip createTrip(Trip trip){
        return tripRepository.save(trip);
     }
     public Trip  updateTrip(UUID id,Trip updated){
        Trip existing = getTripById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setDestination(updated.getDestination());
        existing.setPrice(updated.getPrice());
        existing.setDiscountPercent(updated.getDiscountPercent());
        existing.setDurationDays(updated.getDurationDays());
     return tripRepository.save(existing);
     }
    
}