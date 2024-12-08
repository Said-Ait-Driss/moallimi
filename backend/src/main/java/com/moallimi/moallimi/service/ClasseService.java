package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.payload.response.ClassesListResponse;
import com.moallimi.moallimi.repository.ClasseRepository;
import com.moallimi.moallimi.repository.StudentRepository;

@Service
public class ClasseService {

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Classe addClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public Page<ClassesListResponse> getAllClasse(int page, int size, int filter, String query) {

        Pageable pageable = PageRequest.of(page, size);
        switch (filter) {
            case 1: // Filter by title
                return this.classeRepository.findByAcademicLevelContaining(query, pageable);
            case 2: // Filter by academic level
                return this.classeRepository.findByTitleContaining(query, pageable);
            default: // If no valid filter is provided, all classes
                return this.classeRepository.findAllActiveClasses(pageable);
        }
    }

    public Classe updateClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public Classe deleteClasse(Long classeId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);
        if (classe != null) {
            classe.setIsDeleted(true);
            classeRepository.save(classe);
            return classe;
        }
        return classe;
    }

    public List<Classe> getClassesOfAcademicLevel(Long academicLevelId) {
        return classeRepository.findByAcademicLevelId(academicLevelId);
    }
}
