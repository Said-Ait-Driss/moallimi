package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.repository.ClasseRepository;

@Service
public class ClasseService {

    @Autowired
    private ClasseRepository classeRepository;

    public Classe addClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public List<Classe> getAllClasse() {
        return classeRepository.findAll();
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

    public List<Classe> getClassesOfAcademicLevel(Long academicLevelId){
        return classeRepository.findByAcademicLevelId(academicLevelId);
    }
}
