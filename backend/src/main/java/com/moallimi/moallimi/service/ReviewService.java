package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Review;
import com.moallimi.moallimi.repository.ReviewRepository;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review){
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review){
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsOfTeacher(Long teacherId){
        return reviewRepository.findByTeacherId(teacherId);
    }

    public List<Review> getReviewsOfTeacherMadeByStudents(Long teacherId){
        return reviewRepository.findByTeacherIdAndStudentIdNotNull(teacherId);
    }
}
