package com.moallimi.moallimi.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.payload.dto.AcademicLevelStudentCountDTO;
import com.moallimi.moallimi.payload.dto.ClassStudentCountDTO;
import com.moallimi.moallimi.payload.dto.MonthlyIncreaseDTO;
import com.moallimi.moallimi.service.ClasseService;
import com.moallimi.moallimi.service.EmailService;
import com.moallimi.moallimi.service.LessonService;
import com.moallimi.moallimi.service.StudentService;
import com.moallimi.moallimi.service.SubscriptionService;
import com.moallimi.moallimi.service.TeacherService;

@RestController
@RequestMapping("/api/state")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class StateController {

    @Autowired
    SubscriptionService subscriptionService;

    @Autowired
    StudentService studentService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    EmailService emailService;

    @Autowired
    ClasseService classeService;

    @Autowired
    LessonService lessonService;

    @GetMapping("/general")
    public ResponseEntity<?> getGenralState() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfCurrentMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfPreviousMonth = startOfCurrentMonth.minusMonths(1);
        LocalDateTime endOfPreviousMonth = startOfPreviousMonth.plusMonths(1);

        MonthlyIncreaseDTO subscriptionIncrease = new MonthlyIncreaseDTO("Total Subscriptions",
                subscriptionService.geTotalSubscriptions(),
                subscriptionService.getTotalOfLastMonth(startOfCurrentMonth, endOfPreviousMonth));

        MonthlyIncreaseDTO studentsIncrease = new MonthlyIncreaseDTO("Total Students",
                studentService.geTotalStudents(),
                studentService.getTotalOfLastMonth(startOfCurrentMonth, endOfPreviousMonth));

        MonthlyIncreaseDTO teachersIncrease = new MonthlyIncreaseDTO("Total Teachers",
                teacherService.geTotalTeachers(),
                teacherService.getTotalOfLastMonth(startOfCurrentMonth, endOfPreviousMonth));

        MonthlyIncreaseDTO emailIncrease = new MonthlyIncreaseDTO("Total Emails",
                emailService.geTotalEmails(),
                emailService.getTotalOfLastMonth(startOfCurrentMonth, endOfPreviousMonth));

        MonthlyIncreaseDTO LessonsIncrease = new MonthlyIncreaseDTO("Total Lessons",
                lessonService.geTotalLessons(),
                lessonService.getTotalOfLastMonth(startOfCurrentMonth, endOfPreviousMonth));

        List<MonthlyIncreaseDTO> state = new ArrayList<>();
        state.add(subscriptionIncrease);
        state.add(studentsIncrease);
        state.add(teachersIncrease);
        state.add(emailIncrease);
        state.add(LessonsIncrease);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/classe-student-count")
    public List<ClassStudentCountDTO> getClasseStudentCount() {
        return classeService.getClasseStudentCount();
    }

    @GetMapping("/academic-level-student-count")
    public List<AcademicLevelStudentCountDTO> getAcademicLevelStudentCount() {
        return studentService.getAcademicLevelStudentCount();
    }
}
