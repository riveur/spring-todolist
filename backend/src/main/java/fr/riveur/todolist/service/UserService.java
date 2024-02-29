package fr.riveur.todolist.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.riveur.todolist.dto.CreateUserDto;
import fr.riveur.todolist.exceptions.UserNotFoundException;
import fr.riveur.todolist.model.entity.User;
import fr.riveur.todolist.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository repository;

    public Iterable<User> getAll() {
        return this.repository.findAll();
    }

    public User get(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public User create(CreateUserDto userDto) {
        return this.repository.save(userDto.toUser());
    }

    public User update(Long id, User user) {
        this.repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return this.repository.save(user);
    }

    public void delete(Long id) {
        this.repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        this.repository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("L'email ou le mot de passe est incorrect"));
    }

}
