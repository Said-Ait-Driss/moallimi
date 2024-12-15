package com.moallimi.moallimi.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

    @Query("SELECT e FROM Email e WHERE e.createdAt >= :oneHourAgo AND e.user.id = :userId AND e.code = :code ORDER BY e.createdAt DESC")
    Optional<Email> findLastEmailInLastHourByUserId(@Param("oneHourAgo") LocalDateTime oneHourAgo,
            @Param("userId") Long userId,
            @Param("code") String code);

    // state
    @Query("SELECT COUNT(e) FROM Email e WHERE  e.createdAt >= :startDate AND  e.createdAt < :endDate")
    Long findTotalByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
