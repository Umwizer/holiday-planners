package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.ItineraryDay;
import holiday.planners.HolidayPlanners.service.ItineraryDayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/itinerary")
public class ItineraryDayController {

    private final ItineraryDayService itineraryDayService;

    public ItineraryDayController(ItineraryDayService itineraryDayService) {
        this.itineraryDayService = itineraryDayService;
    }

    @GetMapping
    public List<ItineraryDay> getItineraryForTrip(@PathVariable UUID tripId) {
        return itineraryDayService.getItineraryForTrip(tripId);
    }

    @PostMapping
    public ResponseEntity<ItineraryDay> addDay(@PathVariable UUID tripId, @RequestBody ItineraryDay day) {
        ItineraryDay created = itineraryDayService.addDay(tripId, day);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{dayId}")
    public ResponseEntity<ItineraryDay> updateDay(@PathVariable UUID tripId, @PathVariable UUID dayId,
                                                    @RequestBody ItineraryDay day) {
        ItineraryDay updated = itineraryDayService.updateDay(dayId, day);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{dayId}")
    public ResponseEntity<Void> deleteDay(@PathVariable UUID tripId, @PathVariable UUID dayId) {
        itineraryDayService.deleteDay(dayId);
        return ResponseEntity.noContent().build();
    }
}