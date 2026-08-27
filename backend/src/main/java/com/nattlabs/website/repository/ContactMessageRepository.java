package com.nattlabs.website.repository;

import com.nattlabs.website.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
}
