package com.nattlabs.website.repository;

import com.nattlabs.website.model.PageContent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PageContentRepository extends MongoRepository<PageContent, String> {

    Optional<PageContent> findBySlug(String slug);
}
