package com.nattlabs.website.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "contact_messages")
public class ContactMessage {

    @Id
    private String id;

    private String name;

    private String email;

    private String phone;

    private String message;

    private Instant createdAt;
}
