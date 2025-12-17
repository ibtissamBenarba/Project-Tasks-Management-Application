package com.ibtissam.backend.service;

import com.ibtissam.backend.dto.TaskRequest;
import com.ibtissam.backend.dto.TaskResponse;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(Long projectId, TaskRequest request, String userEmail);

    List<TaskResponse> getTasksByProject(Long projectId, String userEmail);

    TaskResponse markTaskCompleted(Long taskId, String userEmail);

    void deleteTask(Long taskId, String userEmail);
}
