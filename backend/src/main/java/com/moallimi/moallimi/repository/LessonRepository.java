package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Lesson;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    public Optional<Lesson> findByIdAndCreatedAtAfter(Long lessonId, LocalDateTime dateTime);
}
