package fr.riveur.todolist.controller;

import org.springframework.web.bind.annotation.RestController;

import fr.riveur.todolist.dto.CreateCategoryDto;
import fr.riveur.todolist.dto.UpdateCategoryDto;
import fr.riveur.todolist.exceptions.CategoryNotFoundException;
import fr.riveur.todolist.model.entity.Category;
import fr.riveur.todolist.repository.CategoryRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategoryRepository repository;

    @GetMapping("/categories")
    public ResponseEntity<Iterable<Category>> index() {
        return ResponseEntity.ok(this.repository.findAll());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> show(@PathVariable Long id) {
        Category category = this.repository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        return ResponseEntity.ok(category);
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> create(@Valid @RequestBody CreateCategoryDto dto) {
        Category category = this.repository.save(dto.toEntity());
        return ResponseEntity.ok(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @Valid @RequestBody UpdateCategoryDto dto) {
        Category category = this.repository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        category = dto.merge(category);
        this.repository.save(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Category category = this.repository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        this.repository.delete(category);
        return ResponseEntity.noContent().build();
    }
}
