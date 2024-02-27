package fr.riveur.todolist.dto;

import fr.riveur.todolist.model.entity.Category;
import fr.riveur.todolist.model.entity.Todo;
import jakarta.annotation.Nullable;
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
public class CreateTodoDto {

    @Nullable
    @Size(max = 255)
    private String title;

    @NotNull
    @NotBlank
    private String content;

    @Nullable
    private Long categoryId;

    @Nullable
    private Category category;

    public Todo toEntity() {
        Todo todo = Todo.builder()
                .title(this.title)
                .content(this.content)
                .build();
        if (this.categoryId != null) {
            Category category = Category.builder()
                    .id(this.categoryId)
                    .build();
            todo.setCategory(category);
        }
        if (this.category != null) {
            todo.setCategory(category);
        }
        return todo;
    }

}
