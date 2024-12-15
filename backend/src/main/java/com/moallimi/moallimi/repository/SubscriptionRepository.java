package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.createdAt >= :startDate AND s.createdAt < :endDate")
    Long findSubscriptionsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
