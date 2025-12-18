package com.ibtissam.backend.service;

import com.ibtissam.backend.dto.ProjectProgressResponse;
import com.ibtissam.backend.dto.ProjectRequest;
import com.ibtissam.backend.dto.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request, String userEmail);
    List<ProjectResponse> getAllProjects(String userEmail);
    ProjectResponse getProjectById(Long projectId, String userEmail);

    ProjectProgressResponse getProjectProgress(Long projectId, String userEmail);

    void deleteProject(Long projectId, String userEmail);
}
