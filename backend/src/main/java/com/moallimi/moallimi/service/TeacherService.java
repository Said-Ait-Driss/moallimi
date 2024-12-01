package com.moallimi.moallimi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Review;
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

    public Page<TeachersWithReviewsDTO> getAllTeachers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teachersPage = this.teacherRepository.findAll(pageable);

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
}
