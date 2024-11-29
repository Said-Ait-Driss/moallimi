package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.LessonSubscriptions;

@Repository
public interface LessonSubscriptionsRepository extends JpaRepository<LessonSubscriptions, Long> {
    public List<LessonSubscriptions> findByLessonId(Long lessonId);
    public List<LessonSubscriptions> findByStudentId(Long studentId);
}
