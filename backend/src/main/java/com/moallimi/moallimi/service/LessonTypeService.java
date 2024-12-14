package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.LessonType;
import com.moallimi.moallimi.model.Role;
import com.moallimi.moallimi.repository.LessonTypeRepository;
import com.moallimi.moallimi.enums.StudyType;

import jakarta.transaction.Transactional;

@Service
public class LessonTypeService {

    @Autowired
    private LessonTypeRepository lessonTypeRepository;

    public List<LessonType> getAllLessonTypes() {
        return this.lessonTypeRepository.findAll();
    }

    public LessonType addLessonType(LessonType lessonType) {
        return this.lessonTypeRepository.save(lessonType);
    }

    @Transactional
    public void createLessonTypesIfNotExists() {
        for (StudyType studyType : StudyType.values()) {
            if (!lessonTypeRepository.existsByType(studyType)) {
                LessonType lessonType = new LessonType();
                lessonType.setType(studyType);
                lessonTypeRepository.save(lessonType);
            }
        }
    }
}
