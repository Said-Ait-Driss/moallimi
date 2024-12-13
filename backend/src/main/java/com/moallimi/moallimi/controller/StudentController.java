package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.service.StudentService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PutMapping("/update")
    public Student updateStudent(@RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/all/{page}/{size}/{studentId}")
    public Page<Student> getAllStudents(@PathVariable("page") int page, @PathVariable("size") int size,
            @PathVariable("studentId") Long studentId,
            @RequestParam(value = "filter", defaultValue = "-1") int filter,
            @RequestParam(value = "query", defaultValue = "") String query) {
        return studentService.getAllStudents(page, size, studentId, filter, query);
    }
}
