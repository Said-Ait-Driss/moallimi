package com.moallimi.moallimi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.model.Admin;
import com.moallimi.moallimi.model.Experience;
import com.moallimi.moallimi.model.Role;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.request.UpdatePasswordRequest;
import com.moallimi.moallimi.payload.response.ProfileResponse;
import com.moallimi.moallimi.service.AdminService;
import com.moallimi.moallimi.service.ExperienceService;
import com.moallimi.moallimi.service.StudentService;
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
    StudentService studentService;

    @Autowired
    AdminService adminService;

    @Autowired
    ExperienceService experienceService;

    @Autowired
    PasswordEncoder encoder;

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

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        Optional<Role> optionalRole = user.getRoles().stream().findFirst();

        if (!optionalRole.isPresent()) {
            return ResponseEntity.badRequest().body("User must have at least one role.");
        }

        Role role = optionalRole.get();

        switch (role.getName()) {
            case ROLE_STUDENT:
                return updateStudent(user);
            case ROLE_TEACHER:
                return updateTeacher(user);
            case ROLE_ADMIN:
                return updateAdmin(user);
            default:
                return ResponseEntity.badRequest().body("Invalid role.");
        }
    }

    private ResponseEntity<?> updateStudent(User user) {
        Student student = studentService.getStudentById(user.getId());
        updateCommonUserFields(student, user);
        return ResponseEntity.ok(studentService.updateStudent(student));
    }

    private ResponseEntity<?> updateTeacher(User user) {
        Teacher teacher = (Teacher) user;
        return ResponseEntity.ok(teacherService.updateTeacher(teacher));
    }

    private ResponseEntity<?> updateAdmin(User user) {
        Admin admin = (Admin) user;
        return ResponseEntity.ok(adminService.updateAdmin(admin));
    }

    private void updateCommonUserFields(User target, User source) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setAbout(source.getAbout());
        target.setAddress(source.getAddress());
        target.setBirthDate(source.getBirthDate());
        target.setCity(source.getCity());
        target.setGender(source.getGender());
        target.setImage(source.getImage());
        target.setPhoneNumber(source.getPhoneNumber());
        target.setProfession(source.getProfession());
    }

    @PutMapping("/password/update")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        if (!encoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Old password is incorrect.");
        }

        if(!request.getNewPassword().equals(request.getConfirmationPassword())){
            return ResponseEntity.badRequest().body("Confirmtion password is incorrect.");
        }

        user.setPassword(encoder.encode(request.getNewPassword()));

        return ResponseEntity.ok(userService.updateUser(user));
    }
}
