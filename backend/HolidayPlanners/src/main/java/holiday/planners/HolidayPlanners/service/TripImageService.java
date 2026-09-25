package holiday.planners.HolidayPlanners.service;

import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.model.TripImage;
import holiday.planners.HolidayPlanners.repository.TripImageRepository;
import holiday.planners.HolidayPlanners.repository.TripRepository;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TripImageService {
  private final TripImageRepository tripImageRepository;
  private final TripRepository tripRepository;
  
  public TripImageService (TripImageRepository tripImageRepository,TripRepository tripRepository){
    this.tripImageRepository = tripImageRepository;
    this.tripRepository = tripRepository;
  }
  public List <TripImage> getImagesForTrip(UUID tripId){
    return tripImageRepository.findByTourId(tripId);
  }
  public TripImage addImage(UUID tripId , TripImage image){
    Trip trip = tripRepository.findById(tripId).orElseThrow(()-> new RuntimeException("Trip not found"));
    image.setTrip(trip);
    return tripImageRepository.save(image);
  }
  public void deleteImage(UUID imageId){
    tripImageRepository.deleteById(imageId);
  }
}
