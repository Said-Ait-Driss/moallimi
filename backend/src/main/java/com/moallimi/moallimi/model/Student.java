package com.moallimi.moallimi.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("STUDENT")
public class Student extends User{

    @OneToOne
    private AcademicLevel academicLevel;
    
    @OneToOne
    private Parent parent;

    @ManyToMany
    private List<Classe> classes;
}
