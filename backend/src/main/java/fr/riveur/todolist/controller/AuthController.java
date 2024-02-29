package fr.riveur.todolist.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.riveur.todolist.dto.CreateUserDto;
import fr.riveur.todolist.dto.LoginDto;
import fr.riveur.todolist.model.entity.User;
import fr.riveur.todolist.service.JwtTokenService;
import fr.riveur.todolist.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthController {

    private final UserService userService;

    private final PasswordEncoder encoder;

    private final JwtTokenService jwtTokenService;

    private final AuthenticationManager authManager;

    @PostMapping("/auth/register")
    public ResponseEntity<User> register(@Valid @RequestBody CreateUserDto userDto) {
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        return ResponseEntity.ok(this.userService.create(userDto));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDto loginDto) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
                        loginDto.getPassword()));
        return ResponseEntity
                .ok(Map.of("token", this.jwtTokenService.generateToken(authentication)));
    }
}
