package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.payload.dto.ClassStudentCountDTO;
import com.moallimi.moallimi.payload.response.ClassesListResponse;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {
        public List<Classe> findByAcademicLevelId(Long academicLevelId);

        @Query("SELECT new com.moallimi.moallimi.payload.response.ClassesListResponse(c.id, c.title, c.image, c.academicLevel, "
                        +
                        "(SELECT COUNT(s) FROM c.students s), c.isDeleted, c.createdAt, c.updatedAt, " +
                        "(SELECT COUNT(s) FROM c.students s WHERE s.id = :studentId) > 0) " +
                        "FROM Classe c WHERE c.isDeleted = false AND c.academicLevel.id = :academicLevelId")
        Page<ClassesListResponse> findAllActiveClasses(Pageable pageable, Long studentId, Long academicLevelId);

        @Query("SELECT new com.moallimi.moallimi.payload.response.ClassesListResponse(c.id, c.title, c.image, c.academicLevel, "
                        +
                        "(SELECT COUNT(s) FROM c.students s), c.isDeleted, c.createdAt, c.updatedAt, " +
                        "(SELECT COUNT(s) FROM c.students s WHERE s.id = :studentId) > 0) " +
                        "FROM Classe c WHERE c.isDeleted = false AND c.title LIKE %:title% AND c.academicLevel.id = :academicLevelId")
        Page<ClassesListResponse> findByTitleContaining(@Param("title") String title, Pageable pageable,
                        Long studentId, Long academicLevelId);

        @Query("SELECT new com.moallimi.moallimi.payload.dto.ClassStudentCountDTO(c.title, COUNT(s)) " +
                        "FROM Classe c LEFT JOIN c.students s " +
                        "GROUP BY c.id")
        List<ClassStudentCountDTO> countStudentsInClasses();
}
