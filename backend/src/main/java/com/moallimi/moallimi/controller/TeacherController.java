package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.service.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController extends BaseController{
    
    @Autowired
    private TeacherService teacherService;

    @PutMapping("/update")
    public Teacher updateTeacher(@RequestBody Teacher teacher){
        return teacherService.updateTeacher(teacher);
    }
}
