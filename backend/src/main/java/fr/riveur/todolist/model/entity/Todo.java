package fr.riveur.todolist.model.entity;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String title;

    @Column(nullable = false)
    private String content;

    @Builder.Default
    private boolean done = false;

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "created_at")
    @JsonProperty("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Column(insertable = false, name = "updated_at")
    @JsonProperty("updated_at")
    private Instant updatedAt;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(nullable = true)
    private Category category;
}
