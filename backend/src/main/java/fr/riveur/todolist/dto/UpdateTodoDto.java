package fr.riveur.todolist.dto;

import fr.riveur.todolist.model.entity.Category;
import fr.riveur.todolist.model.entity.Todo;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTodoDto {

    @Nullable
    @Size(max = 255)
    private String title;

    @Nullable
    private String content;

    @Nullable
    private boolean done;

    @Nullable
    private Long categoryId;

    @Nullable
    private Category category;

    public Todo merge(Todo existing) {
        if (this.title != null) {
            existing.setTitle(this.title);
        }
        if (this.content != null) {
            existing.setContent(this.content);
        }
        if (this.done) {
            existing.setDone(this.done);
        }
        if (this.categoryId != null) {
            var category = Category.builder()
                    .id(this.categoryId)
                    .build();
            existing.setCategory(category);
        }
        if (this.category != null) {
            existing.setCategory(category);
        }
        return existing;
    }

}
