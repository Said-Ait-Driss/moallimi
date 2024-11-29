package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.payload.response.StudentClasseResponse;
import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.service.StudentClasseService;

@RestController
@RequestMapping("/student-classe")
public class StudentClasseCotroller extends BaseController{

    @Autowired
    private StudentClasseService studentClasseService;

    @PostMapping("/add/{studentId}/{classeId}")
    public StudentClasseResponse addStudentToClasse(@PathVariable("studentId") Long studentId,
            @PathVariable("classeId") Long classeId) {
        return studentClasseService.addStudentToClasse(studentId, classeId);
    }

    // remove student from classe
    @PostMapping("/remove/{studentId}/{classeId}")
    public StudentClasseResponse removeStudentFromClasse(@PathVariable("studentId") Long studentId,
            @PathVariable("classeId") Long classeId) {
        return studentClasseService.removeStudentFromClasse(studentId, classeId);
    }

    // get student classes
    @GetMapping("/get/{studentId}")
    public List<Classe> getStudentClasses(@PathVariable("studentId") Long studentId) {
        return studentClasseService.getClassesOfStudent(studentId);
    }
    // @GetMapping("")

}
