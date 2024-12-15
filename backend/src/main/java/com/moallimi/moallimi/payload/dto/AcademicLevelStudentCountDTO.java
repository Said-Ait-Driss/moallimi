package com.moallimi.moallimi.payload.dto;

public class AcademicLevelStudentCountDTO {
    private String academicLevelName;
    private Long studentCount;

    public AcademicLevelStudentCountDTO(String academicLevelName, Long studentCount) {
        this.academicLevelName = academicLevelName;
        this.studentCount = studentCount;
    }

    public String getAcademicLevelName() {
        return academicLevelName;
    }

    public Long getStudentCount() {
        return studentCount;
    }
}
