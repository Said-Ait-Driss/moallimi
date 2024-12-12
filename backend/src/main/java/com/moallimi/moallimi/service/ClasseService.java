package com.moallimi.moallimi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.model.Student;
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

    public Page<ClassesListResponse> getAllClasse(int page, int size, Long studentId, int filter, String query) {

        Pageable pageable = PageRequest.of(page, size);
        switch (filter) {
            case 1: // Filter by title
                return this.classeRepository.findByAcademicLevelContaining(query, pageable, studentId);
            case 2: // Filter by academic level
                return this.classeRepository.findByTitleContaining(query, pageable, studentId);
            default: // If no valid filter is provided, all classes
                return this.classeRepository.findAllActiveClasses(pageable, studentId);
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

    public ResponseEntity<?> enrollStudentToClasse(Long classeId, Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        Optional<Classe> classeOptional = classeRepository.findById(classeId);

        if (studentOptional.isPresent() && classeOptional.isPresent()) {
            Student student = studentOptional.get();
            Classe classe = classeOptional.get();

            // Enroll the student in the class
            student.getClasses().add(classe);
            classe.getStudents().add(student);

            studentRepository.save(student);
            classeRepository.save(classe);

            return ResponseEntity.ok().body("student enrolled to classe successfully !");
        }

        return ResponseEntity.badRequest().body("student not found");
    }

    public ResponseEntity<?> unEnrollStudentFromClasse(Long classeId, Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        Optional<Classe> classeOptional = classeRepository.findById(classeId);

        if (studentOptional.isPresent() && classeOptional.isPresent()) {
            Student student = studentOptional.get();
            Classe classe = classeOptional.get();

            // Check if the student is currently enrolled in the class
            if (student.getClasses().contains(classe)) {
                // Unenroll the student from the class
                student.getClasses().remove(classe);
                classe.getStudents().remove(student);

                studentRepository.save(student);
                classeRepository.save(classe);

                return ResponseEntity.ok().body("Student unenrolled from class successfully!");
            } else {
                return ResponseEntity.badRequest().body("Student is not enrolled in this class.");
            }
        }

        return ResponseEntity.badRequest().body("Student or class not found.");
    }
}
