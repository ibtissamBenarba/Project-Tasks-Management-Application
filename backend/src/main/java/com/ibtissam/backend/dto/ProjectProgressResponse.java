package com.ibtissam.backend.dto;

public record ProjectProgressResponse(
        long totalTasks,
        long completedTasks,
        int progressPercentage
) {}
