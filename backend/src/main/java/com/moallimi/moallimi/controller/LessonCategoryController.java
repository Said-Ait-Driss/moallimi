package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.LessonCategory;
import com.moallimi.moallimi.service.LessonCategoryService;

@RestController
@ResponseBody
@RequestMapping("/api/lesson-category")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class LessonCategoryController{

    @Autowired
    private LessonCategoryService lessonCategoryService;

    @GetMapping("/all")
    public List<LessonCategory> getAllLessonCategories() {
        return this.lessonCategoryService.getAllLessonCategories();
    }

    @PostMapping("/add")
    public LessonCategory addLessonCategory(@RequestBody LessonCategory lessonCategory) {
        return this.lessonCategoryService.addLessonCategory(lessonCategory);
    }
}
