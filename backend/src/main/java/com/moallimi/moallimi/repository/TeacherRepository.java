package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.moallimi.moallimi.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Long> {
    
}
