package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Notification;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.repository.NotificationRepository;
import com.moallimi.moallimi.repository.StudentRepository;
import com.moallimi.moallimi.repository.TeacherRepository;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyTeacherNewFollower(Long teacherId, String firstName, String lastName, Long studentId) {
        Notification notification = new Notification();
        notification.setFrom(teacherId);
        notification.setTo(studentId);
        notification.setIsRead(false);
        notification.setContent(firstName + " " + lastName + " Followed you");
        messagingTemplate.convertAndSend("/topic/teacher/" + teacherId, notification);
        notificationRepository.save(notification);
    }

    public Page<Notification> getNotificationsOfUser(int page, int size, Long userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return notificationRepository.findAllNotificationsByUserId(userId, pageable);
    }
}
