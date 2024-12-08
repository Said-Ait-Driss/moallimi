package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(User user){
        return userRepository.saveAndFlush(user);
    }

    public User getUserById(Long userId){
        return userRepository.findById(userId).orElse(null);
    }
}
