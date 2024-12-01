package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Review;
import com.moallimi.moallimi.payload.dto.ReviewStatDTO;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    public List<Review> findByTeacherId(Long teacherId);

    public List<Review> findByTeacherIdAndStudentIdNotNull(Long teacherId);

    public List<Review> findByTeacherIdAndParentIdNotNull(Long teacherId);

    @Query("SELECT new com.moallimi.moallimi.payload.dto.ReviewStatDTO(COUNT(r), COALESCE(AVG(r.rating), 0.0)) " +
            "FROM Review r WHERE r.teacher.id = :teacherId AND r.isDeleted = false")
    ReviewStatDTO findReviewStatsByTeacherId(@Param("teacherId") Long teacherId);
}
