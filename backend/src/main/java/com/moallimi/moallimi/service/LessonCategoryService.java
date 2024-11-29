package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.LessonCategory;
import com.moallimi.moallimi.repository.LessonCategoryRepository;

@Service
public class LessonCategoryService {

    @Autowired
    private LessonCategoryRepository lessonCategoryRepository;

    public List<LessonCategory> getAllLessonCategories() {
        return this.lessonCategoryRepository.findAll();
    }

    public LessonCategory addLessonCategory(LessonCategory lessonCategory){
        return this.lessonCategoryRepository.save(lessonCategory);
    }
}
