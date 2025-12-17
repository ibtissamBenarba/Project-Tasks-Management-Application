package com.ibtissam.backend.service;

import com.ibtissam.backend.dto.TaskRequest;
import com.ibtissam.backend.dto.TaskResponse;
import com.ibtissam.backend.model.Project;
import com.ibtissam.backend.model.Task;
import com.ibtissam.backend.repository.ProjectRepository;
import com.ibtissam.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    private Project getProjectOrThrow(Long projectId, String userEmail) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUserEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        return project;
    }

    @Override
    public TaskResponse createTask(Long projectId, TaskRequest request, String userEmail) {
        Project project = getProjectOrThrow(projectId, userEmail);

        Task task = new Task();
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setProject(project);

        Task saved = taskRepository.save(task);

        return mapToResponse(saved);
    }

    @Override
    public List<TaskResponse> getTasksByProject(Long projectId, String userEmail) {
        getProjectOrThrow(projectId, userEmail);

        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse markTaskCompleted(Long taskId, String userEmail) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getProject().getUserEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        task.setCompleted(true);
        return mapToResponse(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long taskId, String userEmail) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getProject().getUserEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);
    }

    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.isCompleted()
        );
    }
}
