package com.moallimi.moallimi.payload.request;

import com.moallimi.moallimi.model.AcademicLevel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAcademicLevelRequest {
    private Long userId;
    private AcademicLevel academicLevel;
}
