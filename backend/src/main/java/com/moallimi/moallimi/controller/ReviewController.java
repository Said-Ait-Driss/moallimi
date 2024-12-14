package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Review;
import com.moallimi.moallimi.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController extends BaseController{
    
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping("/add")
    public Review addReview(Review review){
        return reviewService.addReview(review);
    }

    @GetMapping("/all/{teacherId}")
    public List<Review> getReviewsOfTeacher(@PathVariable Long teacherId){
        return reviewService.getReviewsOfTeacher(teacherId);
    }

    @GetMapping("/by-students/{teacherId}")
    public List<Review> getReviewsOfTeacherMadeByStudents(@PathVariable Long teacherId){
        return reviewService.getReviewsOfTeacherMadeByStudents(teacherId);
    }

}
