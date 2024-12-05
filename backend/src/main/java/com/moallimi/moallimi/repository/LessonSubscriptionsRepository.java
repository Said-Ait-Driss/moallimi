package com.moallimi.moallimi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.LessonSubscriptions;
import com.moallimi.moallimi.payload.response.LessonSubscriptionsWithoutLessonDTO;

@Repository
public interface LessonSubscriptionsRepository extends JpaRepository<LessonSubscriptions, Long> {

        @Query("SELECT new com.moallimi.moallimi.payload.response.LessonSubscriptionsWithoutLessonDTO(ls.id, ls.student, ls.status, ls.absenceReason, ls.studentRating, ls.createdAt) "
                        +
                        "FROM LessonSubscriptions ls WHERE ls.lesson.id = :lessonId")
        public Page<LessonSubscriptionsWithoutLessonDTO> findByLessonId(Long lessonId, Pageable pageable);

        public List<LessonSubscriptions> findByStudentId(Long studentId);

        // @Query("SELECT COUNT(l.student) FROM LessonSubscriptions l WHERE l.lesson.id
        // = :lessonId")
        // public Integer findCountByLessonId(@Param("lessonId") Long lessonId);

        // @Query("SELECT COUNT(l.studentComment) FROM LessonSubscriptions l WHERE
        // l.lesson.id = :lessonId AND l.studentComment IS NOT NULL AND l.studentComment
        // <> ''")
        // public Integer findCommentsCountByLessonId(@Param("lessonId") Long lessonId);

        @Query("SELECT COUNT(l.student)"
                        +
                        "FROM LessonSubscriptions l WHERE l.lesson.id = :lessonId")
        public Long findCountsByLessonId(@Param("lessonId") Long lessonId);


        Optional<LessonSubscriptions> findByStudentIdAndLessonId(Long studentId, Long lessonId);

        public LessonSubscriptions deleteByStudentIdAndLessonId(Long studentId, Long lessonId);

        public List<LessonSubscriptions> findByLessonId(Long lessonId);
}
