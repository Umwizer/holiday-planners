package holiday.planners.HolidayPlanners.controller;

import holiday.planners.HolidayPlanners.model.Testimonial;
import holiday.planners.HolidayPlanners.service.TestimonialService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public List<Testimonial> getAllTestimonials() {
        return testimonialService.getAllTestimonials();
    }

    @GetMapping("/{id}")
    public Testimonial getTestimonialById(@PathVariable UUID id) {
        return testimonialService.getTestimonialById(id);
    }

    @PostMapping
    public ResponseEntity<Testimonial> createTestimonial(@Valid @RequestBody Testimonial testimonial) {
        Testimonial created = testimonialService.createTestimonial(testimonial);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable UUID id,
                                                            @Valid @RequestBody Testimonial testimonial) {
        Testimonial updated = testimonialService.updateTestimonial(id, testimonial);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID id) {
        testimonialService.deleteTestimonials(id);
        return ResponseEntity.noContent().build();
    }
}