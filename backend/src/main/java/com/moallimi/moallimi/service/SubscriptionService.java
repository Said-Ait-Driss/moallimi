package com.moallimi.moallimi.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    
    @Autowired
    SubscriptionRepository subscriptionRepository;
    

    public Long geTotalSubscriptions(){
        return subscriptionRepository.count();
    }

    public Long getTotalOfLastMonth(LocalDateTime startOfPreviousMonth, LocalDateTime endOfPreviousMonth){
        Long count = subscriptionRepository.findSubscriptionsByDateRange(startOfPreviousMonth, endOfPreviousMonth);
        return count;
    }
}
