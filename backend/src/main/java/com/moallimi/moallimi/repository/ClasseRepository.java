package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Classe;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {
    public List<Classe> findByAcademicLevelId(Long academicLevelId);
}
