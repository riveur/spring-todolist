package fr.riveur.todolist.controller;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.riveur.todolist.dto.CreateTodoDto;
import fr.riveur.todolist.dto.UpdateTodoDto;
import fr.riveur.todolist.exceptions.TodoNotFoundException;
import fr.riveur.todolist.model.entity.Todo;
import fr.riveur.todolist.repository.TodoRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class TodoController {

    private final TodoRepository todoRepository;

    @GetMapping("/todos")
    public ResponseEntity<Iterable<Todo>> index() {
        return ResponseEntity.ok(this.todoRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")));
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> show(@PathVariable Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
        return ResponseEntity.ok(todo);
    }

    @PostMapping("/todos")
    public ResponseEntity<Todo> create(@Valid @RequestBody CreateTodoDto dto) {
        Todo todo = this.todoRepository.save(dto.toEntity());
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody UpdateTodoDto dto) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
        todo = dto.merge(todo);
        this.todoRepository.save(todo);
        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
        this.todoRepository.delete(todo);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/todos/{id}/toggle")
    public ResponseEntity<Void> toggle(@PathVariable Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
        todo.setDone(!todo.isDone());
        this.todoRepository.save(todo);
        return ResponseEntity.noContent().build();
    }
}
