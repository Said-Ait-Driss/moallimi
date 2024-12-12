package com.moallimi.moallimi.payload.response;

import java.util.List;

import com.moallimi.moallimi.model.Review;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.dto.ReviewStatDTO;
import com.moallimi.moallimi.payload.dto.WantedTeacherFieldsDTO;

import lombok.Data;

@Data
public class TeachersWithReviewsDTO {
    
    private WantedTeacherFieldsDTO teacher;
    private ReviewStatDTO reviews;
    private Boolean isFollowed;

    public TeachersWithReviewsDTO(WantedTeacherFieldsDTO teacher, ReviewStatDTO reviews, Boolean isFollowed) {
        this.teacher = teacher;
        this.reviews = reviews;
        this.isFollowed = isFollowed;
    }
}