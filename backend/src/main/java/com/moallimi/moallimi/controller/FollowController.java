package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.service.FollowService;

@RestController
@RequestMapping("/api/follow")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping("/follow/{studentId}/{teacherId}")
    public ResponseEntity<Void> followTeacher(@PathVariable Long studentId, @PathVariable Long teacherId) {
        followService.followTeacher(studentId, teacherId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unfollow/{studentId}/{teacherId}")
    public ResponseEntity<Void> unfollowTeacher(@PathVariable Long studentId, @PathVariable Long teacherId) {
        followService.unfollowTeacher(studentId, teacherId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/followed-teachers/{studentId}")
    public ResponseEntity<List<Teacher>> getFollowedTeachers(@PathVariable Long studentId) {
        List<Teacher> followedTeachers = followService.getFollowedTeachers(studentId);
        return ResponseEntity.ok(followedTeachers);
    }
}
