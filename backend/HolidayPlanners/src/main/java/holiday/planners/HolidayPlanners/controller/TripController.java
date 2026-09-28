package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.Trip;
import holiday.planners.HolidayPlanners.service.TripService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
@Tag(name = "Trips", description = "Create, view, search, update and delete trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @Operation(summary = "List all trips")
    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @Operation(summary = "Get one trip with its images and itinerary")
    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable UUID id) {
        return tripService.getTripById(id);
    }

    @Operation(summary = "Search trips by destination (partial, case-insensitive)")
    @GetMapping("/search")
    public List<Trip> searchByDestination(@RequestParam String destination) {
        return tripService.searchByDestination(destination);
    }

    @Operation(summary = "Create a trip")
    @PostMapping
    public ResponseEntity<Trip> createTrip(@Valid @RequestBody Trip trip) {
        Trip created = tripService.createTrip(trip);
        return ResponseEntity.ok(created);
    }

    @Operation(summary = "Update a trip")
    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable UUID id, @Valid @RequestBody Trip trip) {
        Trip updated = tripService.updateTrip(id, trip);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Delete a trip")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable UUID id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}