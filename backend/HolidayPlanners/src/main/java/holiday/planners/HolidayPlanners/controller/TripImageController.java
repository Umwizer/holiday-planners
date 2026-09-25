package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.TripImage;
import holiday.planners.HolidayPlanners.service.TripImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/images")
public class TripImageController {

    private final TripImageService tripImageService;

    public TripImageController(TripImageService tripImageService) {
        this.tripImageService = tripImageService;
    }

    @GetMapping
    public List<TripImage> getImagesForTrip(@PathVariable UUID tripId) {
        return tripImageService.getImagesForTrip(tripId);
    }

    @PostMapping
    public ResponseEntity<TripImage> addImage(@PathVariable UUID tripId, @RequestBody TripImage image) {
        TripImage created = tripImageService.addImage(tripId, image);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable UUID tripId, @PathVariable UUID imageId) {
        tripImageService.deleteImage(imageId);
        return ResponseEntity.noContent().build();
    }
}