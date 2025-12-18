package com.ibtissam.backend.controller;

import com.ibtissam.backend.dto.TaskRequest;
import com.ibtissam.backend.dto.TaskResponse;
import com.ibtissam.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @PathVariable Long projectId,
            @RequestBody TaskRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        TaskResponse response = taskService.createTask(projectId, request, userDetails.getUsername());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            @PathVariable Long projectId,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                taskService.getTasksByProject(projectId, userDetails.getUsername())
        );
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                taskService.getTaskById(taskId, userDetails.getUsername())
        );
    }

    @PatchMapping("/{taskId}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                taskService.markTaskCompleted(taskId, userDetails.getUsername())
        );
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserDetails userDetails) {

        taskService.deleteTask(taskId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
