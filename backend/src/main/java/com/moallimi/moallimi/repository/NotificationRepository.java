package com.moallimi.moallimi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long>{
    public Page<Notification> findAllNotificationsByUserId(Long userId,Pageable pageable);
}
