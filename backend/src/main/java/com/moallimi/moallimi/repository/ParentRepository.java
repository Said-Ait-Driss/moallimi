package com.moallimi.moallimi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moallimi.moallimi.model.Parent;

public interface ParentRepository extends JpaRepository<Parent,Long>{
    
}
