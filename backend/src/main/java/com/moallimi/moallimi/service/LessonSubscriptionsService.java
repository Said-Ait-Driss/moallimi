package com.moallimi.moallimi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.AttendenceTypes;
import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.model.LessonSubscriptions;
import com.moallimi.moallimi.model.Parent;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.payload.response.LessonSubscriptionsWithoutLessonDTO;
import com.moallimi.moallimi.repository.LessonRepository;
import com.moallimi.moallimi.repository.LessonSubscriptionsRepository;
import com.moallimi.moallimi.repository.ParentRepository;
import com.moallimi.moallimi.repository.StudentRepository;

@Service
public class LessonSubscriptionsService {

    @Autowired
    private LessonSubscriptionsRepository lessonSubscriptionsRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ParentRepository parentRepository;

    public LessonSubscriptions subscribeToLessonByStudent(Long lessonId, Long studentId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty())
            return null;

        if (lesson.get().getIsDeleted())
            return null;

        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isEmpty())
            return null;

        LessonSubscriptions subscriptions = new LessonSubscriptions();
        subscriptions.setLesson(lesson.get());
        subscriptions.setStudent(student.get());
        subscriptions.setStatus(AttendenceTypes.PENDING);

        return lessonSubscriptionsRepository.save(subscriptions);
    }

    public LessonSubscriptions unsubscribeToLessonByStudent(Long lessonId, Long studentId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty())
            return null;

        if (lesson.get().getIsDeleted())
            return null;

        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isEmpty())
            return null;

        Optional<LessonSubscriptions> subscriptions = lessonSubscriptionsRepository
                .findByStudentIdAndLessonId(studentId, lessonId);
        if (subscriptions.isPresent()) {
            lessonSubscriptionsRepository.delete(subscriptions.get());
            return subscriptions.get();
        }
        return new LessonSubscriptions();
    }

    public List<LessonSubscriptions> getSubscribers(Long lessonId) {
        return lessonSubscriptionsRepository.findByLessonId(lessonId);
    }

    public LessonSubscriptions subscribeToLessonByParent(Long lessonId, Long parentId, Long studentId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty())
            return null;

        if (lesson.get().getIsDeleted())
            return null;

        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isEmpty())
            return null;

        Optional<Parent> parent = parentRepository.findById(parentId);
        if (student.isEmpty())
            return null;

        if (student.get().getParent().getId().equals(parent.get().getId()))
            return null;

        LessonSubscriptions subscriptions = new LessonSubscriptions();
        subscriptions.setLesson(lesson.get());
        subscriptions.setStudent(student.get());
        subscriptions.setStatus(AttendenceTypes.PENDING);
        return lessonSubscriptionsRepository.save(subscriptions);
    }

    public LessonSubscriptions updateLessonSubscriptions(LessonSubscriptions lessonSubscriptions) {
        Optional<LessonSubscriptions> lessonSubscriptionOptional = lessonSubscriptionsRepository
                .findById(lessonSubscriptions.getId());
        if (lessonSubscriptionOptional.isEmpty())
            return null;
        return lessonSubscriptionsRepository.save(lessonSubscriptions);
    }

    public Page<LessonSubscriptionsWithoutLessonDTO> getAllLessonSubscriptions(Long lessonId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return lessonSubscriptionsRepository.findByLessonId(lessonId, pageable);
    }

    public List<LessonSubscriptions> getAllStudentSubscriptions(Long studentId) {
        return lessonSubscriptionsRepository.findByStudentId(studentId);
    }

}
