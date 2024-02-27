package fr.riveur.todolist.dto;

import fr.riveur.todolist.model.entity.Category;
import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCategoryDto {

    @Nullable
    @NotBlank
    @Size(max = 255)
    private String name;

    @Nullable
    @NotBlank
    @Size(max = 255)
    private String color;

    public Category merge(Category existing) {
        if (this.name != null) {
            existing.setName(this.name);
        }
        if (this.color != null) {
            existing.setColor(this.color);
        }
        return existing;
    }

}
