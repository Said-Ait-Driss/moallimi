package com.moallimi.moallimi.payload.response;

import java.time.LocalDateTime;

import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.dto.WantedUserFieldsDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonDiscussionWithoutLessonDTO {
    private Long id;

    private WantedUserFieldsDTO user;

    private String comment;

    private Boolean isDeleted = false;

    private LocalDateTime createdAt = LocalDateTime.now();

}
