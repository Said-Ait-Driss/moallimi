package com.moallimi.moallimi.payload.response;

import java.util.List;

import com.moallimi.moallimi.model.Experience;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private User user;
    private List<Experience> experiences;
}
