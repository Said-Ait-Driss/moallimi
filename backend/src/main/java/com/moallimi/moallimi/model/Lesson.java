package com.moallimi.moallimi.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Date date;
    private String description;
    private String meetLink;

    private LocalTime starTime;
    private LocalTime endTime;

    @ManyToOne
    private LessonCategory lessonCategory;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private Classe classe;

    @ManyToOne
    private LessonType lessonType;

    private Boolean isValidated = false;

    private Boolean isDeleted = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt; 

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
