package com.moallimi.moallimi.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.repository.EmailRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailRepository emailRepository;

    public boolean sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
        return true;
    }

    public Long geTotalEmails() {
        return emailRepository.count();
    }

    public Long getTotalOfLastMonth(LocalDateTime startOfPreviousMonth, LocalDateTime endOfPreviousMonth) {
        Long count = emailRepository.findTotalByDateRange(startOfPreviousMonth, endOfPreviousMonth);
        return count;
    }
}
