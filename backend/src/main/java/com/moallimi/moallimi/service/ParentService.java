package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Parent;
import com.moallimi.moallimi.repository.ParentRepository;

@Service
public class ParentService {
    
    @Autowired
    private ParentRepository parentRepository;

    public Parent updateParent(Parent parent){
        return parentRepository.save(parent);
    }
}
