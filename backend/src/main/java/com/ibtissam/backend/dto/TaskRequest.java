package com.ibtissam.backend.dto;

import java.time.LocalDate;

public record TaskRequest(
        String title,
        String description,
        LocalDate dueDate
) {}
