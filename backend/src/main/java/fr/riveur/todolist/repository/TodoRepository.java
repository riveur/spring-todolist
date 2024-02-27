package fr.riveur.todolist.repository;

import org.springframework.data.repository.CrudRepository;

import fr.riveur.todolist.model.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Long> {}
