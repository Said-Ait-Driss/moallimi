package com.moallimi.moallimi.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
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
}
