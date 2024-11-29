package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.LessonSubscriptions;
import com.moallimi.moallimi.service.LessonSubscriptionsService;

@RestController
@RequestMapping("/lesson-subscriptions")
public class LessonSubscriptionsController extends BaseController{

    @Autowired
    private LessonSubscriptionsService lessonSubscriptionsService;

    @GetMapping("/lesson-subscribers/{lessonId}")
    public List<LessonSubscriptions> getAllLessonSubscriptions(@PathVariable Long lessonId) {
        return lessonSubscriptionsService.getAllLessonSubscriptions(lessonId);
    }

    @GetMapping("/student-subscriptions/{studentId}")
    public List<LessonSubscriptions> getAllStudentSubscriptions(@PathVariable Long studentId) {
        return lessonSubscriptionsService.getAllStudentSubscriptions(studentId);
    }

    @PutMapping("/subscribe/student/{lessonId}/{studentId}")
    public LessonSubscriptions subscribeToLessonByStudent(@PathVariable("lessonId") Long lessonId,
            @PathVariable("studentId") Long studentId) {
        return lessonSubscriptionsService.subscribeToLessonByStudent(lessonId, studentId);
    }

    @PutMapping("/subscribe/parent/{lessonId}/{parentId}/{studentId}")
    public LessonSubscriptions subscribeToLessonByParent(@PathVariable("lessonId") Long lessonId,
            @PathVariable("parentId") Long parentId, @PathVariable("studentId") Long studentId) {
        return lessonSubscriptionsService.subscribeToLessonByParent(lessonId, parentId, studentId);
    }

    @PutMapping("/update")
    public LessonSubscriptions updateLessonSubscription(@RequestBody LessonSubscriptions lessonSubscriptions) {
        return lessonSubscriptionsService.updateLessonSubscriptions(lessonSubscriptions);
    }
}
