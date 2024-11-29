package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long>{
    
    public List<Review> findByTeacherId(Long teacherId);
    public List<Review> findByTeacherIdAndStudentIdNotNull(Long teacherId);
    public List<Review> findByTeacherIdAndParentIdNotNull(Long teacherId);
}
