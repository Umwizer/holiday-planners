package holiday.planners.HolidayPlanners.services;

import holiday.planners.HolidayPlanners.model.ItineraryDay;
import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.repository.ItineraryDayRepository;
import holiday.planners.HolidayPlanners.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Comparator;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ItineraryDayService {

    private final ItineraryDayRepository itineraryDayRepository;
    private final TripRepository tripRepository;

    public ItineraryDayService(ItineraryDayRepository itineraryDayRepository, TripRepository tripRepository) {
        this.itineraryDayRepository = itineraryDayRepository;
        this.tripRepository = tripRepository;
    }

    public List<ItineraryDay> getItineraryForTrip(UUID tripId) {
        return itineraryDayRepository.findAll().stream()
                .filter(day -> day.getTrip() != null && Objects.equals(day.getTrip().getId(), tripId))
                .sorted(Comparator.comparing(ItineraryDay::getDayNumber))
                .collect(Collectors.toList());
    }

    public ItineraryDay addDay(UUID tripId, ItineraryDay day) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found: " + tripId));
        day.setTrip(trip);
        return itineraryDayRepository.save(day);
    }

    public ItineraryDay updateDay(UUID dayId, ItineraryDay updated) {
        ItineraryDay existing = itineraryDayRepository.findById(dayId)
                .orElseThrow(() -> new RuntimeException("Itinerary day not found: " + dayId));
        existing.setDayNumber(updated.getDayNumber());
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        return itineraryDayRepository.save(existing);
    }

    public void deleteDay(UUID dayId) {
        itineraryDayRepository.deleteById(dayId);
    }
}