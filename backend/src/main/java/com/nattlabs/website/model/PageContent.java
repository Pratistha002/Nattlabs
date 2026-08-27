package com.nattlabs.website.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "page_contents")
public class PageContent {

    @Id
    private String id;

    @Indexed(unique = true)
    private String slug;

    private String title;

    private String summary;

    @Builder.Default
    private List<ContentSection> sections = new ArrayList<>();

    @Builder.Default
    private List<String> pillars = new ArrayList<>();
}
