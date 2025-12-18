package com.ibtissam.backend.dto;

import java.time.LocalDate;

public record TaskResponse(
        Long id,
        String title,
        String description,
        LocalDate dueDate,
        boolean completed
) {}
