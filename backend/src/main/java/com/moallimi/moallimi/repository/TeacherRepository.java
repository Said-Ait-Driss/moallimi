package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

        @Query("SELECT new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) "
                        +
                        "FROM Teacher t WHERE t.profession LIKE %:profession% AND t.academicSpecialist.id = :academicLevelId")
        Page<WantedTeacherFieldsDTO> findByProfessionContaining(@Param("profession") String profession,
                        @Param("academicLevelId") Long academicLevelId, Pageable pageable);

        @Query("SELECT new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) "
                        +
                        "FROM Teacher t WHERE CONCAT(t.firstName, ' ', t.lastName) LIKE %:fullName% AND t.academicSpecialist.id = :academicLevelId")
        Page<WantedTeacherFieldsDTO> findByFullNameContaining(@Param("fullName") String fullName,
                        @Param("academicLevelId") Long academicLevelId, Pageable pageable);

        @Query("SELECT new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) "
                        +
                        "FROM Teacher t WHERE t.city LIKE %:city% AND t.academicSpecialist.id = :academicLevelId")
        Page<WantedTeacherFieldsDTO> findByCityContaining(@Param("city") String city,
                        @Param("academicLevelId") Long academicLevelId, Pageable pageable);

        @Query("SELECT new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) "
                        +
                        "FROM Teacher t WHERE t.academicSpecialist.id = :academicLevelId")
        Page<WantedTeacherFieldsDTO> findAllTeachers(@Param("academicLevelId") Long academicLevelId, Pageable pageable);

        // state
        @Query("SELECT COUNT(t) FROM Teacher t WHERE t.createdAt >= :startDate AND t.createdAt < :endDate")
        Long findTotalByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
