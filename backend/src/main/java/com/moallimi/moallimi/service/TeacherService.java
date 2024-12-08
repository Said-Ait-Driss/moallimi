package com.moallimi.moallimi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.dto.ReviewStatDTO;
import com.moallimi.moallimi.payload.response.TeachersWithReviewsDTO;
import com.moallimi.moallimi.repository.ReviewRepository;
import com.moallimi.moallimi.repository.TeacherRepository;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public Teacher updateTeacher(Teacher teahcer) {
        return this.teacherRepository.save(teahcer);
    }

    public Page<TeachersWithReviewsDTO> getAllTeachers(int page, int size, int filter, String query) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teachersPage;

        switch (filter) {
            case 1: // Filter by profession
                teachersPage = this.teacherRepository.findByProfessionContaining(query, pageable);
                break;
            case 2: // Filter by academic level
                teachersPage = this.teacherRepository.findByAcademicLevelContaining(query, pageable);
                break;
            case 3: // Filter by full name
                teachersPage = this.teacherRepository.findByFullNameContaining(query, pageable);
                break;
            case 4: // Filter by city
                teachersPage = this.teacherRepository.findByCityContaining(query, pageable);
                break;
            default: // If no valid filter is provided, all students
                teachersPage = this.teacherRepository.findAll(pageable);
                break;
        }

        List<TeachersWithReviewsDTO> teacherWithReviewsList = new ArrayList<>();

        for (Teacher teacher : teachersPage.getContent()) {
            ReviewStatDTO reviewStat = reviewRepository.findReviewStatsByTeacherId(teacher.getId());
            teacherWithReviewsList.add(new TeachersWithReviewsDTO(teacher, reviewStat));
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
