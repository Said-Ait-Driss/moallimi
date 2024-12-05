package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.moallimi.moallimi.model.LessonDiscussion;
import com.moallimi.moallimi.payload.response.LessonDiscussionWithoutLessonDTO;

public interface LessonDiscussionRepository extends JpaRepository<LessonDiscussion, Long> {

    @Query("SELECT COUNT(DISTINCT l.user)"
            +
            "FROM LessonDiscussion l WHERE l.lesson.id = :lessonId")
    public Long findCountByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT new com.moallimi.moallimi.payload.response.LessonDiscussionWithoutLessonDTO(ld.id, ld.user, ld.comment, ld.isDeleted, ld.createdAt) "
            +
            "FROM LessonDiscussion ld WHERE ld.lesson.id = :lessonId")
    public Page<LessonDiscussionWithoutLessonDTO> findByLessonId(@Param("lessonId") Long lessonId, Pageable pageable);
}
