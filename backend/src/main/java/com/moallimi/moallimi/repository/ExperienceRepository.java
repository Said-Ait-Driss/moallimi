package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Experience;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
    public List<Experience> findByTeacherId(Long teacherId);
}
