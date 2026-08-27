package com.nattlabs.website.controller;

import com.nattlabs.website.model.Testimonial;
import com.nattlabs.website.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialRepository testimonialRepository;

    @GetMapping
    public List<Testimonial> getTestimonials() {
        return testimonialRepository.findAllByOrderByOrderAsc();
    }
}
