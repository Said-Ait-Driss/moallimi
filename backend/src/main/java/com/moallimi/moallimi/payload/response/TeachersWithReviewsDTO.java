package com.moallimi.moallimi.payload.response;

import java.util.List;

import com.moallimi.moallimi.model.Review;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.dto.ReviewStatDTO;

import lombok.Data;

@Data
public class TeachersWithReviewsDTO {
    
    private Teacher teacher;
    private ReviewStatDTO reviews;

    public TeachersWithReviewsDTO(Teacher teacher, ReviewStatDTO reviews) {
        this.teacher = teacher;
        this.reviews = reviews;
    }
}