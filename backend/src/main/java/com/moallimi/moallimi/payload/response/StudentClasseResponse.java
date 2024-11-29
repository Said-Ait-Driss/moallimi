package com.moallimi.moallimi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.model.Student;

@Data
@AllArgsConstructor
public class StudentClasseResponse {
    Student student;
    Classe classe;
}
