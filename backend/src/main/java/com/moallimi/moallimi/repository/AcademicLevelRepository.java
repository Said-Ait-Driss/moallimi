package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.AcademicLevel;

@Repository
public interface AcademicLevelRepository extends JpaRepository<AcademicLevel, Long> {
}
