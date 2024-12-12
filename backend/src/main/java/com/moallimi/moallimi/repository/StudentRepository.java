package com.moallimi.moallimi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s JOIN s.classes c WHERE c.title LIKE %:className%")
    Page<Student> findByClassContaining(@Param("className") String className, Pageable pageable);

    @Query("SELECT s FROM Student s WHERE s.academicLevel.name LIKE %:academicLevel%")
    Page<Student> findByAcademicLevelContaining(@Param("academicLevel") String academicLevel, Pageable pageable);

    @Query("SELECT s FROM Student s WHERE CONCAT(s.firstName, ' ', s.lastName) LIKE %:fullName%")
    Page<Student> findByFullNameContaining(@Param("fullName") String fullName, Pageable pageable);

    @Query("SELECT s FROM Student s WHERE s.city LIKE %:city%")
    Page<Student> findByCityContaining(@Param("city") String city, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(ft) > 0 THEN true ELSE false END " +
            "FROM Student s JOIN s.followedTeachers ft " +
            "WHERE s.id = :studentId AND ft.id = :teacherId")
    Boolean isTeacherFollowedByStudent(@Param("studentId") Long studentId, @Param("teacherId") Long teacherId);

}
