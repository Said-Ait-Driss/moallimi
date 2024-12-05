package com.moallimi.moallimi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.payload.response.ClassesListResponse;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {
    public List<Classe> findByAcademicLevelId(Long academicLevelId);

    @Query("SELECT new com.moallimi.moallimi.payload.response.ClassesListResponse(c.id, c.title, c.image, c.academicLevel, " +
            "(SELECT COUNT(s) FROM c.students s), c.isDeleted, c.createdAt, c.updatedAt) " +
            "FROM Classe c WHERE c.isDeleted = false")
    List<ClassesListResponse> findAllActiveClasses();
}
