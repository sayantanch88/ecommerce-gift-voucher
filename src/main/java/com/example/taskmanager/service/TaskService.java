package com.example.taskmanager.service;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task create(Task task) {
        task.setId(null);
        return repository.save(task);
    }

    public Task update(Long id, Task updated) {
        Task existing = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Task not found: " + id));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setDueDate(updated.getDueDate());
        existing.setPriority(updated.getPriority());
        existing.setStatus(updated.getStatus());
        return repository.save(existing);
    }

    @Transactional(readOnly = true)
    public Task get(Long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Task not found: " + id));
    }

    @Transactional(readOnly = true)
    public List<Task> list() { return repository.findAll(); }

    public void delete(Long id) { repository.deleteById(id); }

    @Transactional(readOnly = true)
    public List<Task> byStatus(Task.Status status) { return repository.findByStatus(status); }

    @Transactional(readOnly = true)
    public List<Task> byPriority(Task.Priority priority) { return repository.findByPriority(priority); }
}
