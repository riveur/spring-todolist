package fr.riveur.todolist.repository;

import org.springframework.data.repository.CrudRepository;

import fr.riveur.todolist.model.entity.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {}
