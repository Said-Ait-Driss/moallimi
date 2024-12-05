package com.moallimi.moallimi.payload.response;

import java.time.LocalDateTime;

import com.moallimi.moallimi.enums.AttendenceTypes;
import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.model.Student;

import lombok.Data;

@Data
public class LessonSubscriptionsWithoutLessonDTO {
    private Long id;
    private Student student;
    private AttendenceTypes status;

    private String absenceReason;

    private float studentRating;

    private LocalDateTime createdAt;

    public LessonSubscriptionsWithoutLessonDTO(Long id, Student student, AttendenceTypes status, String absenceReason,
            float studentRating,
            LocalDateTime createdAt) {
        this.id = id;
        this.student = student;
        this.status = status;
        this.absenceReason = absenceReason;
        this.studentRating = studentRating;
        this.createdAt = createdAt;
    }
}
