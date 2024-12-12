package com.moallimi.moallimi.payload.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

import com.moallimi.moallimi.model.LessonCategory;
import com.moallimi.moallimi.model.LessonType;
import com.moallimi.moallimi.model.Teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonWithClasseDTO {
    private Long id;
    private String title;
    private Date date;
    private String description;
    private String meetLink;
    private LocalTime starTime;
    private LocalTime endTime;
    private Boolean isValidated;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private ClasseDTO classe;
    private Teacher teacher;
    private LessonCategory lessonCategory;
    private LessonType lessonType;

}