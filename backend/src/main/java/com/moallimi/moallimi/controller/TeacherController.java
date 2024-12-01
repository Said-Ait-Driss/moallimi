package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.response.TeachersWithReviewsDTO;
import com.moallimi.moallimi.service.TeacherService;

@RestController
@RequestMapping("/api/teacher")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials="true", allowedHeaders = "*",methods = RequestMethod.GET)
public class TeacherController {
    
    @Autowired
    private TeacherService teacherService;

    @PutMapping("/update")
    public Teacher updateTeacher(@RequestBody Teacher teacher){
        return teacherService.updateTeacher(teacher);
    }
    
    @GetMapping("/all/{page}/{size}")
    public Page<TeachersWithReviewsDTO> getAllTeachers(@PathVariable("page") int page, @PathVariable("size") int size){
        return teacherService.getAllTeachers(page, size);
    }
}
