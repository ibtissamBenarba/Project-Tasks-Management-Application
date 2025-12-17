package com.ibtissam.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
}
