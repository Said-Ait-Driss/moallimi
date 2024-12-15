package com.moallimi.moallimi.payload.dto;

public class ClassStudentCountDTO {
    private String classTitle;
    private Long studentCount;

    public ClassStudentCountDTO(String classTitle, Long studentCount) {
        this.classTitle = classTitle;
        this.studentCount = studentCount;
    }

    public String getClassTitle() {
        return classTitle;
    }

    public Long getStudentCount() {
        return studentCount;
    }
}
