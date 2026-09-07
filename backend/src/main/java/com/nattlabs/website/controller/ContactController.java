package com.nattlabs.website.controller;

import com.nattlabs.website.dto.ContactRequest;
import com.nattlabs.website.model.ContactMessage;
import com.nattlabs.website.repository.ContactMessageRepository;
import com.nattlabs.website.service.ContactMailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMailService contactMailService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName().trim())
                .email(request.getEmail().trim())
                .phone(request.getPhone() != null ? request.getPhone().trim() : null)
                .message(request.getMessage().trim())
                .createdAt(Instant.now())
                .build();

        ContactMessage saved = contactMessageRepository.save(message);

        String mailError = contactMailService.sendContactNotification(saved);
        if (mailError != null) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of(
                    "error", mailError
            ));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", saved.getId(),
                "message", "Thank you for contacting NATTLABS. We will get back to you soon."
        ));
    }
}
