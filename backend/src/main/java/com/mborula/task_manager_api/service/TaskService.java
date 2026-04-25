package com.mborula.task_manager_api.service;


import com.mborula.task_manager_api.dto.CreateTaskRequest;
import com.mborula.task_manager_api.model.Task;
import com.mborula.task_manager_api.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setCompleted(false);

        return taskRepository.save(task);
    }
}
