package com.moallimi.moallimi.payload.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.moallimi.moallimi.enums.Gender;
import com.moallimi.moallimi.model.AcademicLevel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WantedTeacherFieldsDTO {
    private Long id;

    private String email;
    private String username;

    private String firstName;
    private String lastName;

    private String phoneNumber;
    private String address;
    private Date birthDate;
    private String image;
    private String profession;
    private String cover;
    private String city;
    private String about;
    private Gender gender;
    private Boolean isDeleted = false;
    private Boolean isSuspended = false;
    private AcademicLevel academicSpecialist;
    private Boolean isApproved;
    private String website;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
