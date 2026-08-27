package com.nattlabs.website.service;

import com.nattlabs.website.config.ContactInfoConstants;
import com.nattlabs.website.model.ContactMessage;
import jakarta.mail.internet.InternetAddress;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
public class ContactMailService {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm z").withZone(ZoneId.of("Asia/Kolkata"));

    @Nullable
    private final JavaMailSender mailSender;

    @Value("${app.mail.from:}")
    private String mailFrom;

    @Value("${app.mail.to:" + ContactInfoConstants.SUPPORT_EMAIL + "}")
    private String mailTo;

    public ContactMailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean isConfigured() {
        return mailSender != null && resolveFromAddress() != null && mailTo != null && !mailTo.isBlank();
    }

    public String resolveFromAddress() {
        if (mailFrom != null && !mailFrom.isBlank()) {
            return mailFrom.trim();
        }
        return null;
    }

    /**
     * Sends the contact submission to the NATTLABS inbox.
     *
     * @return null on success, or an error message when delivery fails
     */
    public String sendContactNotification(ContactMessage contact) {
        if (!isConfigured()) {
            log.warn("Contact mail is not configured — message saved for {} but no email was sent", contact.getEmail());
            return null;
        }

        try {
            var mimeMessage = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(new InternetAddress(resolveFromAddress(), "NATTLABS Website"));
            helper.setTo(mailTo.trim());
            helper.setReplyTo(contact.getEmail().trim(), contact.getName().trim());
            helper.setSubject("[NATTLABS Website] Contact from " + contact.getName().trim());
            helper.setText(buildBody(contact), false);

            mailSender.send(mimeMessage);
            log.info("Contact form email sent to {} for {}", mailTo, contact.getEmail());
            return null;
        } catch (Exception ex) {
            log.error("Failed to send contact email for {}", contact.getEmail(), ex);
            return "Unable to deliver your message by email right now. Please try again or email "
                    + ContactInfoConstants.SUPPORT_EMAIL + " directly.";
        }
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
