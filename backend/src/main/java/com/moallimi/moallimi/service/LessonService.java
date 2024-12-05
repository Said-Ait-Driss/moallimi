package com.moallimi.moallimi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.payload.dto.LessonWithSubscriptionsDTO;
import com.moallimi.moallimi.repository.LessonDiscussionRepository;
import com.moallimi.moallimi.repository.LessonRepository;
import com.moallimi.moallimi.repository.LessonSubscriptionsRepository;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonSubscriptionsRepository lessonSubscriptionsRepository;

    @Autowired
    private LessonDiscussionRepository lessonDiscussionRepository;

    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public Page<LessonWithSubscriptionsDTO> getAllLessons(int page, int size, Boolean recent, Boolean faceToFace,
            Boolean remote, Long studentId) {
        Pageable pageable = null;
        if (recent) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt").descending());
        } else if (faceToFace) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lessonType").ascending());
        } else if (remote) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "lessonType").descending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id").descending());
        }

        Page<Lesson> lessonsPage = lessonRepository.findAll(pageable);

        List<LessonWithSubscriptionsDTO> lessonWithSubscriptionsList = new ArrayList<>();
        for (Lesson lesson : lessonsPage.getContent()) {
            Long studentCount = lessonSubscriptionsRepository.findCountsByLessonId(lesson.getId());
            Boolean isSubscribed = lessonSubscriptionsRepository.findByStudentIdAndLessonId(studentId,lesson.getId()).isPresent();
            Long commentsCount = lessonDiscussionRepository.findCountByLessonId(lesson.getId());

            lessonWithSubscriptionsList.add(new LessonWithSubscriptionsDTO(lesson, studentCount, commentsCount,isSubscribed));
        }
        return new PageImpl<>(lessonWithSubscriptionsList, pageable, lessonsPage.getTotalElements());
    }

    public LessonWithSubscriptionsDTO getLesson(Long id,Long studentId) {
        Optional<Lesson> lesson = lessonRepository.findById(id);
        if (lesson.isPresent()) {
            Long studentCount = lessonSubscriptionsRepository.findCountsByLessonId(id);
            Long commentsCount = lessonDiscussionRepository.findCountByLessonId(id);
            Boolean isSubscribed = lessonSubscriptionsRepository.findByStudentIdAndLessonId(studentId,id).isPresent();

            return new LessonWithSubscriptionsDTO(lesson.get(), studentCount, commentsCount,isSubscribed);
        }
        return null;
    }

    public Lesson cancelLesson(Long lessonId) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        Optional<Lesson> lesson = lessonRepository.findByIdAndCreatedAtAfter(lessonId, oneHourAgo);

        if (lesson.isEmpty()) {
            return null;
        }

        Lesson lessontoUpdate = lesson.get();
        if (lessontoUpdate.getIsDeleted()) {
            return null;
        }
        lessontoUpdate.setIsDeleted(true);
        return lessonRepository.save(lessontoUpdate);
    }

    public Lesson validateLesson(Long lessonId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty()) {
            return null;
        }
        Lesson lessonToValidate = lesson.get();
        lessonToValidate.setIsValidated(true);
        return lessonRepository.save(lessonToValidate);
    }

}
