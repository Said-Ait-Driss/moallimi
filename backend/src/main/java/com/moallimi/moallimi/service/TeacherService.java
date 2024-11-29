package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.repository.TeacherRepository;

@Service
public class TeacherService {
    
    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher updateTeacher(Teacher teahcer){
        return this.teacherRepository.save(teahcer);
    }
}
