package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Notification;
import com.moallimi.moallimi.service.NotificationService;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/all/{page}/{size}/{userId}")
    public Page<Notification> getNotificationsOfUser(@PathVariable("page") int page, @PathVariable("size") int size,
            @PathVariable("userId") Long userId) {
        return notificationService.getNotificationsOfUser(page, size, userId);
    }

    @MessageMapping("/notification")
    @SendTo("/topic/teacher/{teacherId}")
    public Notification sendMessage(Notification notification) {
        return notification;
    }
}
