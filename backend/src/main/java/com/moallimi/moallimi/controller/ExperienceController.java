package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Experience;
import com.moallimi.moallimi.service.ExperienceService;

@RestController
@RequestMapping("/experience")
public class ExperienceController extends BaseController{
    
    @Autowired
    private ExperienceService experienceService;

    @PostMapping("/add")
    public Experience addExperience(@RequestBody Experience experience){
        return experienceService.addExperience(experience);
    }

    @GetMapping("/all")
    public List<Experience> getAllExperiences(){
        return experienceService.getAllExperiences();
    }

    @GetMapping("/all/{teacherId}")
    public List<Experience> getExperiencesOfTeacher(@PathVariable Long teacherId){
        return experienceService.getExperiencesOfTeacher(teacherId);
    }

    @PutMapping("/update")
    public Experience updateExperience(@RequestBody Experience experience){
        return experienceService.updateExperience(experience);
    }
}
