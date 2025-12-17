package com.ibtissam.backend.controller;

import com.ibtissam.backend.dto.ProjectRequest;
import com.ibtissam.backend.dto.ProjectResponse;
import com.ibtissam.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@RequestBody ProjectRequest request,
                                                         @AuthenticationPrincipal UserDetails userDetails) {
        ProjectResponse response = projectService.createProject(request, userDetails.getUsername());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(@AuthenticationPrincipal UserDetails userDetails) {
        List<ProjectResponse> projects = projectService.getAllProjects(userDetails.getUsername());
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        ProjectResponse project = projectService.getProjectById(id, userDetails.getUsername());
        return ResponseEntity.ok(project);
    }
}
