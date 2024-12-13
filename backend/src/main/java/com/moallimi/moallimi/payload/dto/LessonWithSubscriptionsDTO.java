package com.moallimi.moallimi.payload.dto;

import com.moallimi.moallimi.model.Lesson;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonWithSubscriptionsDTO {

    private LessonWithClasseDTO lesson;
    private int subscriptionsCount;
    private int commentsCount;
    private Boolean isSubscribed;
}
