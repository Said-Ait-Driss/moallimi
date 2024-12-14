package com.moallimi.moallimi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.AcademicLevelsSupported;
import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.enums.LessonCategories;
import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.model.LessonCategory;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.request.UserAcademicLevelRequest;
import com.moallimi.moallimi.repository.AcademicLevelRepository;
import com.moallimi.moallimi.repository.StudentRepository;
import com.moallimi.moallimi.repository.TeacherRepository;
import com.moallimi.moallimi.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AcademicLevelService {
    @Autowired
    private AcademicLevelRepository academicLevelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public AcademicLevel addAcademicLevel(AcademicLevel academicLevel) {
        return academicLevelRepository.save(academicLevel);
    }

    public AcademicLevel updateAcademicLevel(AcademicLevel academicLevel) {
        return academicLevelRepository.save(academicLevel);
    }

    public AcademicLevel deleteAcademicLevel(Long academicLevelId) {
        Optional<AcademicLevel> optional = academicLevelRepository.findById(academicLevelId);
        if (optional.isEmpty())
            return new AcademicLevel();

        optional.get().setIsDeleted(true);
        return academicLevelRepository.save(optional.get());
    }

    public List<AcademicLevel> getAllAcademicLevels() {
        return academicLevelRepository.findAll();
    }

    public ResponseEntity<?> updateAcademicLevelForUser(AcademicLevel academicLevel, Long userId) {
        Optional<AcademicLevel> optional = academicLevelRepository.findById(academicLevel.getId());
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body("Academic level not found");
        }
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = optionalUser.get();
        if (user.getRoles().stream().findFirst().get().getName().equals(EnumRole.ROLE_STUDENT)) {
            Student student = (Student) user;
            student.setAcademicLevel(academicLevel);
            return ResponseEntity.ok(studentRepository.save(student));
        } else if (user.getRoles().stream().findFirst().get().getName().equals(EnumRole.ROLE_TEACHER)) {
            Teacher teacher = (Teacher) user;
            teacher.setAcademicSpecialist(academicLevel);
            return ResponseEntity.ok(teacherRepository.save(teacher));
        }
        return ResponseEntity.badRequest().body("You are not either teacher or student !");
    }

    @Transactional
    public void createAcademicLevelIfNotExists() {
        for (AcademicLevelsSupported academicLevelSupported : AcademicLevelsSupported.values()) {
            if (!academicLevelRepository.existsByName(academicLevelSupported.toString().toLowerCase())) {
                AcademicLevel academicLevel = new AcademicLevel();
                academicLevel.setName(academicLevelSupported.toString().toLowerCase());
                academicLevelRepository.save(academicLevel);
            }
        }
    }
}
