package com.moallimi.moallimi.payload.response;

import lombok.Data;

import java.time.LocalDateTime;

import com.moallimi.moallimi.model.AcademicLevel;

@Data
public class ClassesListResponse {
    private Long id;
    private String title;
    private String image;
    private AcademicLevel academicLevel;
    private Long studentCount;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isEnrolled;

    public ClassesListResponse(Long id, String title, String image, AcademicLevel academicLevel, Long studentCount,
            Boolean isDeleted,
            LocalDateTime createdAt, LocalDateTime updatedAt, Boolean isEnrolled) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.academicLevel = academicLevel;
        this.studentCount = studentCount;

        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isEnrolled = isEnrolled;
    }
}
