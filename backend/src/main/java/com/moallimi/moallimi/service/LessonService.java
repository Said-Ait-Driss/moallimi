package com.moallimi.moallimi.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Lesson;
import com.moallimi.moallimi.repository.LessonRepository;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
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
