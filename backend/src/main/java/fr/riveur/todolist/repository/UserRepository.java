package fr.riveur.todolist.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import fr.riveur.todolist.model.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
    public Optional<User> findByEmail(String email);
}
