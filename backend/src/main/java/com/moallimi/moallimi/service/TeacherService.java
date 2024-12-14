package com.moallimi.moallimi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.dto.ReviewStatDTO;
import com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO;
import com.moallimi.moallimi.payload.response.TeachersWithReviewsDTO;
import com.moallimi.moallimi.repository.AcademicLevelRepository;
import com.moallimi.moallimi.repository.ReviewRepository;
import com.moallimi.moallimi.repository.StudentRepository;
import com.moallimi.moallimi.repository.TeacherRepository;
import com.moallimi.moallimi.enums.EnumRole;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AcademicLevelRepository academicLevelRepository;

    @Autowired
    UserService userService;

    public Teacher updateTeacher(Teacher teahcer) {
        return this.teacherRepository.save(teahcer);
    }

    public Page<TeachersWithReviewsDTO> getAllTeachers(int page, int size, Long studentId, int filter, String query) {
        Pageable pageable = PageRequest.of(page, size);

        User user = userService.getUserProfile(studentId);
        AcademicLevel academicLevel = null;
        ;

        if (user.getRoles() != null && user.getRoles().stream().anyMatch(r -> r.getName() == EnumRole.ROLE_TEACHER)) {
            Teacher teacher = this.getTeacherProfile(studentId);
            academicLevel = teacher.getAcademicSpecialist();
        } else if (user.getRoles() != null
                && user.getRoles().stream().anyMatch(r -> r.getName() == EnumRole.ROLE_STUDENT)) {
            Student student = studentRepository.findById(studentId).get();
            academicLevel = student.getAcademicLevel();
        }

        if (academicLevel == null) {
            academicLevel = academicLevelRepository.findAll().getFirst();
        }

        Page<WantedTeacherFieldsDTO> teachersPage;

        switch (filter) {
            case 1: // Filter by profession
                teachersPage = this.teacherRepository.findByProfessionContaining(query, academicLevel.getId(),
                        pageable);
                break;
            case 3: // Filter by full name
                teachersPage = this.teacherRepository.findByFullNameContaining(query, academicLevel.getId(), pageable);
                break;
            case 4: // Filter by city
                teachersPage = this.teacherRepository.findByCityContaining(query, academicLevel.getId(), pageable);
                break;
            default: // If no valid filter is provided, all students
                teachersPage = this.teacherRepository.findAllTeachers(academicLevel.getId(), pageable);
                break;
        }

        List<TeachersWithReviewsDTO> teacherWithReviewsList = new ArrayList<>();

        for (WantedTeacherFieldsDTO teacher : teachersPage.getContent()) {
            ReviewStatDTO reviewStat = reviewRepository.findReviewStatsByTeacherId(teacher.getId());
            Boolean isFollowed = (studentId != -1)
                    ? studentRepository.isTeacherFollowedByStudent(studentId, teacher.getId())
                    : false;
            teacherWithReviewsList.add(new TeachersWithReviewsDTO(teacher, reviewStat, isFollowed));
        }
        return new PageImpl<>(teacherWithReviewsList, pageable, teachersPage.getTotalElements());
    }

    public List<Teacher> getAllTeachers() {
        return this.teacherRepository.findAll();
    }

    public Teacher getTeacherProfile(Long userId) {
        return teacherRepository.findById(userId).orElse(null);
    }
}
