package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student updateStudent(Student student) {
        return this.studentRepository.save(student);
    }

    public Student getStudentById(Long id) {
        return this.studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public Page<Student> getAllStudents(int page, int size, int filter, String query) {
        Pageable pageable = PageRequest.of(page, size);
        // return this.studentRepository.findAll(pageable);
        switch (filter) {
            case 1: // Filter by classes
                return this.studentRepository.findByClassContaining(query, pageable);
            case 2: // Filter by academic level
                return this.studentRepository.findByAcademicLevelContaining(query, pageable);
            case 3: // Filter by full name
                return this.studentRepository.findByFullNameContaining(query, pageable);
            case 4: // Filter by city
                return this.studentRepository.findByCityContaining(query, pageable);
            default: // If no valid filter is provided, return all students
                return this.studentRepository.findAll(pageable);
        }
    }

}
