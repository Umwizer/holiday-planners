package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable UUID id) {
        return tripService.getTripById(id);
    }

    @GetMapping("/search")
    public List<Trip> searchByDestination(@RequestParam String destination) {
        return tripService.searchByDestination(destination);
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@Valid @RequestBody Trip trip) {
        Trip created = tripService.createTrip(trip);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable UUID id, @Valid @RequestBody Trip trip) {
        Trip updated = tripService.updateTrip(id, trip);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable UUID id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}