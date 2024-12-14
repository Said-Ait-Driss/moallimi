package com.moallimi.moallimi.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("TEACHER")
public class Teacher extends User {
    
    @ManyToOne(cascade = CascadeType.MERGE)
    private AcademicLevel academicSpecialist;
    private Boolean isApproved;
    private String website;

    @JsonIgnore
    @ManyToMany(mappedBy = "followedTeachers")
    private List<Student> followers = new ArrayList<>();
}
