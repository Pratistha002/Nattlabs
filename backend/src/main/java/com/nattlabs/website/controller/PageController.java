package com.nattlabs.website.controller;

import com.nattlabs.website.model.PageContent;
import com.nattlabs.website.repository.PageContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/pages")
@RequiredArgsConstructor
public class PageController {

    private final PageContentRepository pageContentRepository;

    @GetMapping
    public List<PageContent> getAllPages() {
        return pageContentRepository.findAll();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PageContent> getPageBySlug(@PathVariable String slug) {
        return pageContentRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Page not found: " + slug));
    }
}
