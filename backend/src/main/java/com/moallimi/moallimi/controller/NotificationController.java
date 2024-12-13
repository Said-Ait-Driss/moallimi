package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Notification;
import com.moallimi.moallimi.service.NotificationService;

@RestController
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/of-user/{page}/{size}/{userId}")
    public Page<Notification> getNotificationsOfUser(@PathVariable("page") int page, @PathVariable("size") int size,
            @PathVariable("userId") Long userId) {
        return notificationService.getNotificationsOfUser(page, size, userId);
    }
}
