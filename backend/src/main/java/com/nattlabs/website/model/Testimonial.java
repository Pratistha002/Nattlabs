package com.nattlabs.website.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "testimonials")
public class Testimonial {

    @Id
    private String id;

    private String name;

    private String quote;

    private String imageUrl;

    private int rating;

    @Indexed
    private int order;
}
