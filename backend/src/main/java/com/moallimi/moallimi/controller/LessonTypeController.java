package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.LessonType;
import com.moallimi.moallimi.service.LessonTypeService;

@RestController
@ResponseBody
@RequestMapping("/api/lesson-type")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true" )
public class LessonTypeController {

    @Autowired
    private LessonTypeService lessonTypeService;

    @GetMapping("/all")
    public List<LessonType> getAllLessonTypes() {
        return this.lessonTypeService.getAllLessonTypes();
    }

    @PostMapping("/add")
    public LessonType addLessonType(@RequestBody LessonType lessonType) {
        return this.lessonTypeService.addLessonType(lessonType);
    }
}
