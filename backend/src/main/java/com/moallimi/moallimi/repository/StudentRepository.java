package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    
}
