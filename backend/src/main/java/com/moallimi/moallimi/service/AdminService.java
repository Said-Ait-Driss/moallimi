package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Admin;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.repository.AdminRepository;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;


    public Admin updateAdmin(Admin student){
        return this.adminRepository.save(student);
    }
}
