package holiday.planners.HolidayPlanners.services;

import holiday.planners.HolidayPlanners.model.Testimonial;
import holiday.planners.HolidayPlanners.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TestimonialService {
    private final TestimonialRepository testimonialRepository;
    public TestimonialService(TestimonialRepository  testimonialRepository){
        this.testimonialRepository = testimonialRepository;
    }
    public List<Testimonial> getAllTestimonials(){
        return testimonialRepository.findAll();
    }
    public Testimonial getTestimonialById(UUID id){
        return testimonialRepository.findById(id)
               .orElseThrow(()-> new RuntimeException("Testimonial not found" +id));

    }
    public Testimonial createTestimonial(Testimonial testimonial){
        return testimonialRepository.save(testimonial);
    }
    public Testimonial updateTestimonial(UUID id,Testimonial updated){
        Testimonial existing = getTestimonialById(id);
        existing.setCustomerName(updated.getCustomerName());
        existing.setRating(updated.getRating());
        existing.setQuote(updated.getQuote());
        existing.setPhotoUrl(updated.getPhotoUrl());
        existing.setSource(updated.getSource());
        return testimonialRepository.save(existing);
    }
    public void deleteTestimonials(UUID id){
        testimonialRepository.deleteById(id);
    }
}
