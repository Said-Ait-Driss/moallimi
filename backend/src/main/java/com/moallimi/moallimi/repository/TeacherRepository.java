package com.moallimi.moallimi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("SELECT t FROM Teacher t WHERE t.profession LIKE %:profession%")
    Page<Teacher> findByProfessionContaining(@Param("profession") String profession, Pageable pageable);

    @Query("SELECT t FROM Teacher t WHERE t.academicSpecialist.name LIKE %:academicLevel%")
    Page<Teacher> findByAcademicLevelContaining(@Param("academicLevel") String academicLevel, Pageable pageable);

    @Query("SELECT t FROM Teacher t WHERE CONCAT(t.firstName, ' ', t.lastName) LIKE %:fullName%")
    Page<Teacher> findByFullNameContaining(@Param("fullName") String fullName, Pageable pageable);

    @Query("SELECT t FROM Teacher t WHERE t.city LIKE %:city%")
    Page<Teacher> findByCityContaining(@Param("city") String city, Pageable pageable);
}
