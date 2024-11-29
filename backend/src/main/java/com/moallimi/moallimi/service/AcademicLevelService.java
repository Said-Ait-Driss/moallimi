package com.moallimi.moallimi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.repository.AcademicLevelRepository;

@Service
public class AcademicLevelService {
    @Autowired
    private AcademicLevelRepository academicLevelRepository;

    public AcademicLevel addAcademicLevel(AcademicLevel academicLevel) {
        return academicLevelRepository.save(academicLevel);
    }

    public AcademicLevel updateAcademicLevel(AcademicLevel academicLevel) {
        return academicLevelRepository.save(academicLevel);
    }

    public AcademicLevel deleteAcademicLevel(Long academicLevelId) {
        Optional<AcademicLevel> optional = academicLevelRepository.findById(academicLevelId);
        if (optional.isEmpty())
            return new AcademicLevel();

        optional.get().setIsDeleted(true);
        return academicLevelRepository.save(optional.get());
    }

    public List<AcademicLevel> getAllAcademicLevels() {
        return academicLevelRepository.findAll();
    }
}
