package com.mborula.task_manager_api.dto;

import lombok.Getter;
import lombok.Setter;

// Frontend data handling
@Getter
@Setter
public class CreateTaskRequest {
    private String title;
    private boolean completed;
}
