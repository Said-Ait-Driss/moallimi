package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.payload.request.UserAcademicLevelRequest;
import com.moallimi.moallimi.service.AcademicLevelService;

@RestController
@RequestMapping("/api/academic-level")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class AcademicLevelController {
    @Autowired
    private AcademicLevelService academicLevelService;

    @GetMapping("/all")
    public List<AcademicLevel> getAllAcademicLevels() {
        return academicLevelService.getAllAcademicLevels();
    }

    @PostMapping("/add")
    public AcademicLevel addAcademicLevel(@RequestBody AcademicLevel academicLevel) {
        return academicLevelService.addAcademicLevel(academicLevel);
    }

    @PutMapping("/update")
    public AcademicLevel updateAcademicLevel(@RequestBody AcademicLevel academicLevel) {
        return academicLevelService.updateAcademicLevel(academicLevel);
    }

    @DeleteMapping("/delete/{academicLevelId}")
    public void deleteAcademicLevel(@PathVariable Long academicLevelId) {
        academicLevelService.deleteAcademicLevel(academicLevelId);
    }

    @PutMapping("/user/update")
    public ResponseEntity<?> updateAcademicLevelForUser(@RequestBody UserAcademicLevelRequest userAcademicLevel) {
        return academicLevelService.updateAcademicLevelForUser(userAcademicLevel.getAcademicLevel(),
                userAcademicLevel.getUserId());
    }

}
