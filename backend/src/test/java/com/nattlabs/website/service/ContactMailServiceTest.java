package com.nattlabs.website.service;

import com.nattlabs.website.model.ContactMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;

class ContactMailServiceTest {

    private ContactMailService service;

    @BeforeEach
    void setUp() {
        service = new ContactMailService(null);
        ReflectionTestUtils.setField(service, "mailFrom", "");
        ReflectionTestUtils.setField(service, "mailTo", "support@nattlabs.com");
    }

    @Test
    void isConfiguredFalseWhenMailSenderMissing() {
        assertFalse(service.isConfigured());
    }

    @Test
    void sendContactNotificationSkipsWhenNotConfigured() {
        ContactMessage message = ContactMessage.builder()
                .name("Test User")
                .email("user@example.com")
                .phone("+91 99999 99999")
                .message("Hello")
                .createdAt(Instant.now())
                .build();

        assertNull(service.sendContactNotification(message));
    }
}
