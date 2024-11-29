package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.DiplomAndCertaficate;

@Repository
public interface DiplomAndCertaficateRepository extends JpaRepository<DiplomAndCertaficate, Long> {
    public List<DiplomAndCertaficate> findByTeacherId(Long teacherId);
}
