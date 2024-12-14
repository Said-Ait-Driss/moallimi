package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.enums.LessonCategories;
import com.moallimi.moallimi.model.LessonCategory;

@Repository
public interface LessonCategoryRepository extends JpaRepository<LessonCategory, Long> {
    boolean existsByLessonCategory(LessonCategories category);
}
