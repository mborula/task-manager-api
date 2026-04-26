package com.mborula.task_manager_api.controller;


import com.mborula.task_manager_api.dto.CreateTaskRequest;
import com.mborula.task_manager_api.model.Task;
import com.mborula.task_manager_api.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public void addTask(@RequestBody CreateTaskRequest request) {
        taskService.createTask(request);
    }

    @PutMapping("/{id}")
    public void updateTask(@PathVariable long id, @RequestBody CreateTaskRequest request) {
        taskService.updateTask(id,request);

    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable long id) {
        taskService.deleteTask(id);
    }
}
