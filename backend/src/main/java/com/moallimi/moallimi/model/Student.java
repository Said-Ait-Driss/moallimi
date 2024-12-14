package com.moallimi.moallimi.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("STUDENT")
public class Student extends User {

  @ManyToOne(cascade = CascadeType.MERGE)
  private AcademicLevel academicLevel;

  @JsonIgnore
  @ManyToMany
  private List<Classe> classes;

  @JsonIgnore
  @ManyToMany
  @JoinTable(name = "student_teacher_follow", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "teacher_id"))
  private List<Teacher> followedTeachers = new ArrayList<>();
}
