package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.payload.dto.LessonWithClasseDTO;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    public Optional<Lesson> findByIdAndCreatedAtAfter(Long lessonId, LocalDateTime dateTime);

    @Query("SELECT new com.moallimi.moallimi.payload.dto.LessonWithClasseDTO(l.id, l.title, l.date, l.description, l.meetLink, l.starTime, l.endTime, l.isValidated, l.isDeleted, l.createdAt, l.updatedAt, "
            +
            "new com.moallimi.moallimi.payload.dto.ClasseDTO(c.id, c.title, c.image), l.teacher, l.lessonCategory, l.lessonType) " +
            "FROM Lesson l JOIN l.classe c")
    Page<LessonWithClasseDTO> findAllLessons(Pageable pageable);

}
