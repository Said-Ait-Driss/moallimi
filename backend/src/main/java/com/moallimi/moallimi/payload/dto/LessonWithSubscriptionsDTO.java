package com.moallimi.moallimi.payload.dto;

import com.moallimi.moallimi.model.Lesson;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonWithSubscriptionsDTO {
    private Lesson lesson;
    private Long subscriptionsCount;
    private Long commentsCount;
    private Boolean isSubscribed;
}
