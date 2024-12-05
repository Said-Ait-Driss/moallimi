package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.LessonSubscriptions;
import com.moallimi.moallimi.payload.response.LessonSubscriptionsWithoutLessonDTO;
import com.moallimi.moallimi.service.LessonSubscriptionsService;

@RestController
@ResponseBody
@RequestMapping("/api/lesson-subscriptions")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true", allowedHeaders = "*")
public class LessonSubscriptionsController {

    @Autowired
    private LessonSubscriptionsService lessonSubscriptionsService;

    @GetMapping("/{lessonId}/{page}/{size}")
    public Page<LessonSubscriptionsWithoutLessonDTO> getAllLessonSubscriptions(@PathVariable("lessonId") Long lessonId,
            @PathVariable("page") int page, @PathVariable("size") int size) {
        return lessonSubscriptionsService.getAllLessonSubscriptions(lessonId, page, size);
    }

    @GetMapping("/student-subscriptions/{studentId}")
    public List<LessonSubscriptions> getAllStudentSubscriptions(@PathVariable Long studentId) {
        return lessonSubscriptionsService.getAllStudentSubscriptions(studentId);
    }

    @PostMapping("/subscribe/student/{lessonId}/{studentId}")
    public LessonSubscriptions subscribeToLessonByStudent(@PathVariable("lessonId") Long lessonId,
            @PathVariable("studentId") Long studentId) {
        return lessonSubscriptionsService.subscribeToLessonByStudent(lessonId, studentId);
    }

    @PostMapping("/unsubscribe/student/{lessonId}/{studentId}")
    public LessonSubscriptions unsubscribeToLessonByStudent(@PathVariable("lessonId") Long lessonId,
            @PathVariable("studentId") Long studentId) {
        return lessonSubscriptionsService.unsubscribeToLessonByStudent(lessonId, studentId);
    }

    @GetMapping("/subscribers/{lessonId}")
    public List<LessonSubscriptions> getSubscribers(@PathVariable Long lessonId) {
        return lessonSubscriptionsService.getSubscribers(lessonId);
    }

    @PutMapping("/update")
    public LessonSubscriptions updateLessonSubscription(@RequestBody LessonSubscriptions lessonSubscriptions) {
        return lessonSubscriptionsService.updateLessonSubscriptions(lessonSubscriptions);
    }
}
