package fr.riveur.todolist.dto;

import fr.riveur.todolist.model.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDto {
    @NotNull
    @NotBlank
    @Size(max = 255)
    private String firstname;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String lastname;

    @NotNull
    @NotBlank
    @Size(max = 255)
    @Email
    private String email;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String password;

    public User toUser() {
        return User.builder()
                .firstname(this.firstname)
                .lastname(this.lastname)
                .email(this.email)
                .password(this.password)
                .build();
    }
}
