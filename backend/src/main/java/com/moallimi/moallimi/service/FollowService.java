package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.repository.StudentRepository;
import com.moallimi.moallimi.repository.TeacherRepository;

@Service
public class FollowService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public void followTeacher(Long studentId, Long teacherId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (!student.getFollowedTeachers().contains(teacher)) {
            student.getFollowedTeachers().add(teacher);
            teacher.getFollowers().add(student);
            studentRepository.save(student);
            teacherRepository.save(teacher);
        }
    }

    public void unfollowTeacher(Long studentId, Long teacherId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (student.getFollowedTeachers().contains(teacher)) {
            student.getFollowedTeachers().remove(teacher);
            teacher.getFollowers().remove(student);
            studentRepository.save(student);
            teacherRepository.save(teacher);
        }
    }

    public List<Teacher> getFollowedTeachers(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return student.getFollowedTeachers();
    }
}
