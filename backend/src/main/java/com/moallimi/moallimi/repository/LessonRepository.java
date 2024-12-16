package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.payload.dto.LessonWithClasseDTO;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    public Optional<Lesson> findByIdAndCreatedAtAfter(Long lessonId, LocalDateTime dateTime);

    @Query("SELECT new com.moallimi.moallimi.payload.dto.LessonWithClasseDTO(l.id, l.title, l.date, l.description, l.meetLink, l.starTime, l.endTime, l.isValidated, l.isDeleted, l.createdAt, l.updatedAt, "
            + "new com.moallimi.moallimi.payload.dto.ClasseDTO(c.id, c.title, c.image), "
            + "new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) , "
            + "l.lessonCategory, l.lessonType) "
            + "FROM Lesson l JOIN l.classe c JOIN l.teacher t "
            + "WHERE t IN (SELECT ft FROM Student s JOIN s.followedTeachers ft WHERE s.id = :studentId)")
    Page<LessonWithClasseDTO> findAllLessonsByFollowedTeachers(@Param("studentId") Long studentId, Pageable pageable);

    @Query("SELECT new com.moallimi.moallimi.payload.dto.LessonWithClasseDTO(l.id, l.title, l.date, l.description, l.meetLink, l.starTime, l.endTime, l.isValidated, l.isDeleted, l.createdAt, l.updatedAt, "
            + "new com.moallimi.moallimi.payload.dto.ClasseDTO(c.id, c.title, c.image), "
            + "new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt), "
            + "l.lessonCategory, l.lessonType) "
            + "FROM Lesson l JOIN l.classe c JOIN l.teacher t "
            + "ORDER BY l.createdAt ASC")
    List<LessonWithClasseDTO> getLatestLessons(Pageable pageable);

    @Query("SELECT new com.moallimi.moallimi.payload.dto.LessonWithClasseDTO(l.id, l.title, l.date, l.description, l.meetLink, l.starTime, l.endTime, l.isValidated, l.isDeleted, l.createdAt, l.updatedAt, "
            + "new com.moallimi.moallimi.payload.dto.ClasseDTO(c.id, c.title, c.image), "
            + "new com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO(t.id, t.email, t.username, t.firstName, t.lastName, t.phoneNumber, t.address, t.birthDate, t.image, t.profession, t.cover, t.city, t.about, t.gender, t.isDeleted, t.isSuspended, t.academicSpecialist, t.isApproved, t.website, t.createdAt, t.updatedAt) , "
            + "l.lessonCategory, l.lessonType) "
            + "FROM Lesson l JOIN l.classe c JOIN l.teacher t  WHERE l.id = :lessonId")
    public LessonWithClasseDTO findLessonById(Long lessonId);

    // state
    @Query("SELECT COUNT(e) FROM Lesson e WHERE  e.createdAt >= :startDate AND  e.createdAt < :endDate")
    Long findTotalByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
