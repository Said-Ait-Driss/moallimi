package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.service.LessonService;

@RestController
@RequestMapping("/lesson")
public class LessonController extends BaseController{

    @Autowired
    private LessonService lessonService;

    @PostMapping("/add")
    public Lesson addLesson(@RequestBody Lesson lesson) {
        return lessonService.addLesson(lesson);
    }

    @PutMapping("/cancel/{lessonId}")
    public Lesson cancelLesson(@PathVariable Long lessonId) {
        return lessonService.cancelLesson(lessonId);
    }

    @PutMapping("/validate/{lessonId}")
    public Lesson validateLesson(@PathVariable Long lessonId) {
        return lessonService.validateLesson(lessonId);
    }
}
