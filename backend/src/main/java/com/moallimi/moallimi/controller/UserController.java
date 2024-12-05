package com.moallimi.moallimi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.enums.Role;
import com.moallimi.moallimi.model.Experience;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.response.ProfileResponse;
import com.moallimi.moallimi.service.ExperienceService;
import com.moallimi.moallimi.service.TeacherService;
import com.moallimi.moallimi.service.UserService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    ExperienceService experienceService;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        User user = userService.getUserProfile(userId);
        if (user.getRoles() != null && user.getRoles().stream().anyMatch(r -> r.getName() == EnumRole.ROLE_TEACHER)) {
            Teacher teacher = teacherService.getTeacherProfile(userId);
            List<Experience> experiences = experienceService.getExperiencesOfTeacher(userId);
            return ResponseEntity.ok(new ProfileResponse(teacher, experiences));
        } else {
            List<Experience> experiences = new ArrayList();
            return ResponseEntity.ok(new ProfileResponse(user, experiences));
        }
    }
}
