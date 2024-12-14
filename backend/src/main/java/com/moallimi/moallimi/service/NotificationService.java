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
import com.moallimi.moallimi.model.User;
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

    public Notification saveNewNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void notifyTeacherNewFollower(User teacher, User student) {
        Notification notification = new Notification();
        notification.setFrom(student);
        notification.setTo(teacher);
        notification.setIsRead(false);
        notification.setContent(student.getLastName() + " " + student.getLastName() + " Followed you");
        messagingTemplate.convertAndSend("/topic/teacher/" + teacher.getId(), notification);
        saveNewNotification(notification);
    }

    public void notifyTeacherNewComment(User teacher, User student, String comment) {
        Notification notification = new Notification();
        notification.setFrom(student);
        notification.setTo(teacher);
        notification.setIsRead(false);
        notification.setContent(
                student.getFirstName() + " " + student.getLastName() + " Comment on you post ! \n " + comment);
        messagingTemplate.convertAndSend("/topic/teacher/" + teacher.getId(), notification);
        saveNewNotification(notification);
    }

    public Page<Notification> getNotificationsOfUser(int page, int size, Long userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return notificationRepository.findAllNotificationsByUserId(userId, pageable);
    }
}
