package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Experience;
import com.moallimi.moallimi.repository.ExperienceRepository;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public Experience addExperience(Experience experience){
        return this.experienceRepository.save(experience);
    }

    public List<Experience> getAllExperiences(){
        return this.experienceRepository.findAll();
    }

    public List<Experience> getExperiencesOfTeacher(Long teacherId){
        return this.experienceRepository.findByTeacherId(teacherId);
    }

    public Experience updateExperience(Experience experience){
        return this.experienceRepository.save(experience);
    }
}
