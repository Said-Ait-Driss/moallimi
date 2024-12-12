package com.moallimi.moallimi.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("TEACHER")
public class Teacher extends User{
    @OneToOne
    private AcademicLevel academicSpecialist;
    private Boolean isApproved;
    private String website;


     @ManyToMany(mappedBy = "followedTeachers")
    private List<Student> followers = new ArrayList<>();
}
