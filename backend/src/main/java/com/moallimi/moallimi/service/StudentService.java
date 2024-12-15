package com.moallimi.moallimi.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.dto.AcademicLevelStudentCountDTO;
import com.moallimi.moallimi.repository.StudentRepository;
import com.moallimi.moallimi.repository.TeacherRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    UserService userService;

    public Student updateStudent(Student student) {
        return this.studentRepository.save(student);
    }

    public Student getStudentById(Long id) {
        return this.studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public Page<Student> getAllStudents(int page, int size, Long studentId, int filter, String query) {
        Pageable pageable = PageRequest.of(page, size);

        User user = userService.getUserProfile(studentId);
        AcademicLevel academicLevel;

        if (user.getRoles() != null && user.getRoles().stream().anyMatch(r -> r.getName() == EnumRole.ROLE_TEACHER)) {
            Teacher teacher = teacherRepository.findById(studentId).orElse(null);
            academicLevel = teacher.getAcademicSpecialist();
        } else if (user.getRoles() != null
                && user.getRoles().stream().anyMatch(r -> r.getName() == EnumRole.ROLE_STUDENT)) {
            Student student = studentRepository.findById(studentId).get();
            academicLevel = student.getAcademicLevel();
        } else {
            return this.studentRepository.findAll(pageable);
        }

        if (academicLevel == null) {
            return this.studentRepository.findAll(pageable);
        }

        // return this.studentRepository.findAll(pageable);
        switch (filter) {
            case 1: // Filter by classes
                return this.studentRepository.findByClassContaining(query, academicLevel.getId(), pageable);
            case 3: // Filter by full name
                return this.studentRepository.findByFullNameContaining(query, academicLevel.getId(), pageable);
            case 4: // Filter by city
                return this.studentRepository.findByCityContaining(query, academicLevel.getId(), pageable);
            default: // If no valid filter is provided, return all students
                return this.studentRepository.findAllStudents(academicLevel.getId(), pageable);
        }
    }

    // state
    public Long geTotalStudents() {
        return studentRepository.count();
    }

    public Long getTotalOfLastMonth(LocalDateTime startOfPreviousMonth, LocalDateTime endOfPreviousMonth) {
        Long count = studentRepository.findTotalByDateRange(startOfPreviousMonth, endOfPreviousMonth);
        return count;
    }

    public List<AcademicLevelStudentCountDTO> getAcademicLevelStudentCount() {
        return studentRepository.countStudentsByAcademicLevel();
    }
}
