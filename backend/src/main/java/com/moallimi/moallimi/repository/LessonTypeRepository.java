package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.enums.StudyType;
import com.moallimi.moallimi.model.LessonType;

@Repository
public interface LessonTypeRepository extends JpaRepository<LessonType,Long>{
    boolean existsByType(StudyType type);
}
