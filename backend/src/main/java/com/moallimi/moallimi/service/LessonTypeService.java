package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.LessonType;
import com.moallimi.moallimi.repository.LessonTypeRepository;

@Service
public class LessonTypeService {

    @Autowired
    private LessonTypeRepository studyTypeRepository;

    public List<LessonType> getAllLessonTypes() {
        return this.studyTypeRepository.findAll();
    }

    public LessonType addLessonType(LessonType lessonType){
        return this.studyTypeRepository.save(lessonType);
    }
}
