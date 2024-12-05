package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.LessonDiscussion;
import com.moallimi.moallimi.payload.response.LessonDiscussionWithoutLessonDTO;
import com.moallimi.moallimi.service.LessonDiscussionService;

@RestController
@RequestMapping("/api/lesson-discussion")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class LessonDiscussionController {

    @Autowired
    private LessonDiscussionService lessonDiscussionService;

    @GetMapping("/{lessonId}/{page}/{size}")
    public Page<LessonDiscussionWithoutLessonDTO> getLessonDiscussion(@PathVariable("lessonId") Long lessonId,
            @PathVariable("page") int page, @PathVariable("size") int size) {
        return lessonDiscussionService.getLessonDiscussion(lessonId, page, size);
    }

    @PostMapping("/comment")
    public LessonDiscussion createLessonDiscussion(@RequestBody LessonDiscussion lessonDiscussion) {
        return lessonDiscussionService.createLessonDiscussion(lessonDiscussion);
    }
}
