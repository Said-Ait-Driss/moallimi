package com.moallimi.moallimi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollStudentToClasseRequest {
    private Long studentId;
    private Long classeId;
}
