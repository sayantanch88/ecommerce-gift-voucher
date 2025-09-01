package com.example.taskmanager.controller;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend:3000"})
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody Task task) {
        return service.create(task);
    }

    @GetMapping
    public List<Task> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Task get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable("id") Long id, @Valid @RequestBody Task task) {
        return service.update(id, task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @GetMapping("/status/{status}")
    public List<Task> byStatus(@PathVariable Task.Status status) {
        return service.byStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<Task> byPriority(@PathVariable Task.Priority priority) {
        return service.byPriority(priority);
    }
}
