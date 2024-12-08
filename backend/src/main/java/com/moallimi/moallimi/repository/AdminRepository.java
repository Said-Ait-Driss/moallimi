package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moallimi.moallimi.model.Admin;

public interface AdminRepository  extends JpaRepository<Admin, Long> {
    
}
