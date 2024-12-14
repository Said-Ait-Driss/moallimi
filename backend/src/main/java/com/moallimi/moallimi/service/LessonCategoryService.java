package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.LessonCategories;
import com.moallimi.moallimi.enums.StudyType;
import com.moallimi.moallimi.model.LessonCategory;
import com.moallimi.moallimi.model.LessonType;
import com.moallimi.moallimi.repository.LessonCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class LessonCategoryService {

    @Autowired
    private LessonCategoryRepository lessonCategoryRepository;

    public List<LessonCategory> getAllLessonCategories() {
        return this.lessonCategoryRepository.findAll();
    }

    public LessonCategory addLessonCategory(LessonCategory lessonCategory) {
        return this.lessonCategoryRepository.save(lessonCategory);
    }

    @Transactional
    public void createLessonCategoryIfNotExists() {
        for (LessonCategories lessonCat : LessonCategories.values()) {
            if (!lessonCategoryRepository.existsByLessonCategory(lessonCat)) {
                LessonCategory lessonCategory = new LessonCategory();
                lessonCategory.setLessonCategory(lessonCat);
                lessonCategoryRepository.save(lessonCategory);
            }
        }
    }
}
