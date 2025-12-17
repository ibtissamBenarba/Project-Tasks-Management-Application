package com.ibtissam.backend.service;

import com.ibtissam.backend.dto.ProjectRequest;
import com.ibtissam.backend.dto.ProjectResponse;
import com.ibtissam.backend.model.Project;
import com.ibtissam.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponse createProject(ProjectRequest request, String userEmail) {
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setUserEmail(userEmail);

        Project saved = projectRepository.save(project);

        return new ProjectResponse(saved.getId(), saved.getTitle(), saved.getDescription());
    }

    @Override
    public List<ProjectResponse> getAllProjects(String userEmail) {
        return projectRepository.findByUserEmail(userEmail)
                .stream()
                .map(p -> new ProjectResponse(p.getId(), p.getTitle(), p.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse getProjectById(Long projectId, String userEmail) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if(!project.getUserEmail().equals(userEmail)){
            throw new RuntimeException("Unauthorized");
        }

        return new ProjectResponse(project.getId(), project.getTitle(), project.getDescription());
    }
}
