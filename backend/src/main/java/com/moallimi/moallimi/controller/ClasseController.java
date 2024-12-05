package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.payload.response.ClassesListResponse;
import com.moallimi.moallimi.service.ClasseService;

@RestController
@RequestMapping("/api/classe")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @PostMapping("/add")
    public Classe addClasse(@RequestBody Classe classe) {
        return classeService.addClasse(classe);
    }

    @GetMapping("/all")
    public List<ClassesListResponse> getAllClasse() {
        return classeService.getAllClasse();
    }

    @PutMapping("/update")
    public Classe updateClasse(@RequestBody Classe classe) {
        return classeService.updateClasse(classe);
    }

    @DeleteMapping("/delete/{classeId}")
    public Classe deleteClasse(@PathVariable Long classeId) {
        return classeService.deleteClasse(classeId);
    }

    @GetMapping("/of-academic-level/{academicLevelId}")
    public List<Classe> getClassesOfAcademicLevel(@PathVariable Long academicLevelId) {
        return classeService.getClassesOfAcademicLevel(academicLevelId);
    }
}
