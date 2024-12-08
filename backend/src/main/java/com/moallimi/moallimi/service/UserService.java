package com.moallimi.moallimi.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Email;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.request.UpdateEmailRequest;
import com.moallimi.moallimi.repository.EmailRepository;
import com.moallimi.moallimi.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    EmailService emailService;

    public User getUserProfile(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(User user) {
        return userRepository.saveAndFlush(user);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public ResponseEntity<?> sendEmailToUser(User user) {
        Email email = new Email();
        email.setSubject("Test Email");
        email.setMessage("code for changing your email address is : ");
        email.setEmail(user.getEmail());
        email.setCode("1234");
        email.setUser(user);
        
        Boolean isSent = emailService.sendSimpleEmail(email.getEmail(), email.getSubject(),
                email.getMessage() + email.getCode());
        if (isSent) {
            emailRepository.save(email);
            return ResponseEntity.ok("email has been sent to your account");
        }
        return null;
    }

    public ResponseEntity<?> updateEmail(User user, UpdateEmailRequest request) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        Optional<Email> email = emailRepository.findLastEmailInLastHourByUserId(oneHourAgo, user.getId(),
                request.getCode());
        if (email.isPresent()) {
            user.setEmail(request.getNewEmail());
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.badRequest().build();
    }
}
