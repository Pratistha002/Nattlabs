package com.nattlabs.website.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nattlabs.website.config.ContactInfoConstants;
import com.nattlabs.website.model.ContactMessage;
import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.InternetAddress;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Service
public class ContactMailService {

    private static final URI BREVO_SEND_URL = URI.create("https://api.brevo.com/v3/smtp/email");
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm z").withZone(ZoneId.of("Asia/Kolkata"));

    @Nullable
    private final JavaMailSender mailSender;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    @Value("${app.mail.from:}")
    private String mailFrom;

    @Value("${app.mail.to:" + ContactInfoConstants.SUPPORT_EMAIL + "," + ContactInfoConstants.CAREERS_EMAIL + "}")
    private String mailTo;

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    public ContactMailService(
            @Autowired(required = false) JavaMailSender mailSender,
            ObjectMapper objectMapper) {
        this.mailSender = mailSender;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    void logMailStatus() {
        if (isConfigured()) {
            log.info(
                    "Contact mail ready via {} — from {} to {}",
                    hasBrevoApi() ? "Brevo API" : "SMTP",
                    resolveFromAddress(),
                    String.join(", ", resolveToAddresses()));
        } else {
            log.warn("Contact mail is not configured. Set BREVO_API_KEY or SPRING_MAIL_* plus APP_MAIL_FROM, then recreate the backend.");
        }
    }

    public boolean isConfigured() {
        return resolveFromAddress() != null
                && resolveToAddresses().length > 0
                && (hasBrevoApi() || mailSender != null);
    }

    public String resolveFromAddress() {
        if (mailFrom != null && !mailFrom.isBlank()) {
            return mailFrom.trim();
        }
        return null;
    }

    /**
     * Sends the contact submission to the NATTLABS inboxes.
     *
     * @return null on success, or an error message when delivery fails
     */
    public String sendContactNotification(ContactMessage contact) {
        if (!isConfigured()) {
            log.warn("Contact mail is not configured — message saved for {} but no email was sent", contact.getEmail());
            return "Email delivery is not configured. Please email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " or "
                    + ContactInfoConstants.CAREERS_EMAIL + " directly.";
        }

        String subject = "[NATTLABS Website] Contact from " + contact.getName().trim();
        String body = buildBody(contact);

        if (hasBrevoApi()) {
            String apiError = sendViaBrevoApi(contact, subject, body);
            if (apiError == null) {
                return null;
            }
            log.warn("Brevo API send failed, trying SMTP: {}", apiError);
        }

        return sendViaSmtp(contact, subject, body);
    }

    private boolean hasBrevoApi() {
        return brevoApiKey != null && brevoApiKey.trim().startsWith("xkeysib-");
    }

    private String sendViaBrevoApi(ContactMessage contact, String subject, String body) {
        try {
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("sender", Map.of("name", "NATTLABS Website", "email", resolveFromAddress()));
            payload.put("to", Arrays.stream(resolveToAddresses())
                    .map(email -> Map.of("email", email))
                    .toList());
            payload.put("replyTo", Map.of("email", contact.getEmail().trim(), "name", contact.getName().trim()));
            payload.put("subject", subject);
            payload.put("textContent", body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(BREVO_SEND_URL)
                    .timeout(Duration.ofSeconds(30))
                    .header("accept", "application/json")
                    .header("content-type", "application/json")
                    .header("api-key", brevoApiKey.trim())
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(payload)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Contact form email sent via Brevo API to {} for {}",
                        String.join(", ", resolveToAddresses()), contact.getEmail());
                return null;
            }
            log.warn("Brevo API email failed HTTP {} — {}", response.statusCode(), response.body());
            return "Unable to deliver your message by email right now. Please try again or email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " directly.";
        } catch (Exception ex) {
            log.error("Brevo API email error for {}", contact.getEmail(), ex);
            return "Unable to deliver your message by email right now. Please try again or email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " directly.";
        }
    }

    private String sendViaSmtp(ContactMessage contact, String subject, String body) {
        if (mailSender == null) {
            return "Unable to deliver your message by email right now. Please try again or email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " directly.";
        }
        try {
            var mimeMessage = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(new InternetAddress(resolveFromAddress(), "NATTLABS Website"));
            helper.setTo(resolveToAddresses());
            helper.setReplyTo(contact.getEmail().trim(), contact.getName().trim());
            helper.setSubject(subject);
            helper.setText(body, false);
            mailSender.send(mimeMessage);
            log.info("Contact form email sent via SMTP to {} for {}",
                    String.join(", ", resolveToAddresses()), contact.getEmail());
            return null;
        } catch (Exception ex) {
            log.error("Failed to send contact email for {}", contact.getEmail(), ex);
            return "Unable to deliver your message by email right now. Please try again or email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " directly.";
        }
    }

    private String[] resolveToAddresses() {
        if (mailTo == null || mailTo.isBlank()) {
            return new String[0];
        }
        return Arrays.stream(mailTo.split(","))
                .map(String::trim)
                .filter(address -> !address.isBlank())
                .distinct()
                .toArray(String[]::new);
    }

    private String buildBody(ContactMessage contact) {
        String phone = contact.getPhone() == null || contact.getPhone().isBlank()
                ? "Not provided"
                : contact.getPhone().trim();

        return """
                New message from the NATTLABS website contact form

                Name: %s
                Email: %s
                Phone: %s

                Message:
                %s

                ---
                Submitted: %s
                Reply to this email to reach the sender directly.
                """.formatted(
                contact.getName().trim(),
                contact.getEmail().trim(),
                phone,
                contact.getMessage().trim(),
                FORMATTER.format(contact.getCreatedAt())
        );
    }
}
