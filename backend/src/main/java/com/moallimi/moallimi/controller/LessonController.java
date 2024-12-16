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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.payload.dto.LessonWithClasseDTO;
import com.moallimi.moallimi.payload.dto.LessonWithClasseWithSubscriptionsDTO;
import com.moallimi.moallimi.payload.dto.LessonWithSubscriptionsDTO;
import com.moallimi.moallimi.service.LessonService;

@RestController
@RequestMapping("/api/lesson")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @PostMapping("/add")
    public Lesson addLesson(@RequestBody Lesson lesson) {
        return lessonService.addLesson(lesson);
    }

    @GetMapping("/all/{page}/{size}/{studentId}")
    public Page<LessonWithClasseWithSubscriptionsDTO> getAllLessons(@PathVariable("page") int page,
            @PathVariable("size") int size,
            @PathVariable("studentId") Long studentId,
            @RequestParam(value = "recent", defaultValue = "true") Boolean recent,
            @RequestParam(value = "face_to_face", defaultValue = "false") Boolean faceToFace,
            @RequestParam(value = "remote", defaultValue = "false") Boolean remote) {
        return lessonService.getAllLessons(page, size, recent, faceToFace, remote, studentId);
    }

    @GetMapping("/latest")
    public List<LessonWithClasseDTO> getLatestLessons() {
        return lessonService.getLatestLessons();
    }

    @GetMapping("/my/{page}/{size}/{studentId}")
    public Page<LessonWithSubscriptionsDTO> getMyLessons(@PathVariable("page") int page, @PathVariable("size") int size,
            @PathVariable("studentId") Long studentId) {
        return lessonService.getMyLessons(page, size, studentId);
    }

    @GetMapping("/{id}/{studentId}")
    public LessonWithSubscriptionsDTO getLesson(@PathVariable("id") Long id,
            @PathVariable("studentId") Long studentId) {
        return lessonService.getLesson(id, studentId);
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
