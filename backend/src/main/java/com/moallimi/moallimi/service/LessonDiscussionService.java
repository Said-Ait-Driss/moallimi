package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.LessonDiscussion;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.response.LessonDiscussionWithoutLessonDTO;
import com.moallimi.moallimi.repository.LessonDiscussionRepository;

@Service
public class LessonDiscussionService {

    @Autowired
    private LessonDiscussionRepository lessonDiscussionRepository;

    @Autowired
    private NotificationService notificationService;

    public Page<LessonDiscussionWithoutLessonDTO> getLessonDiscussion(Long lessonId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lessonDiscussionRepository.findByLessonId(lessonId, pageable);
    }

    public LessonDiscussion createLessonDiscussion(LessonDiscussion lessonDiscussion) {
        User user = lessonDiscussion.getUser();
        User teacher = lessonDiscussion.getLesson().getTeacher();
        String comment = lessonDiscussion.getComment();

        notificationService.notifyTeacherNewComment(teacher, user, comment);
        return lessonDiscussionRepository.save(lessonDiscussion);
    }
}
