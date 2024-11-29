package com.moallimi.moallimi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.payload.response.StudentClasseResponse;
import com.moallimi.moallimi.model.Classe;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.repository.ClasseRepository;
import com.moallimi.moallimi.repository.StudentRepository;

@Service
public class StudentClasseService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClasseRepository classeRepository;

    public StudentClasseResponse addStudentToClasse(Long studentId, Long classeId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        Optional<Classe> optionalClasse = classeRepository.findById(classeId);

        if (optionalStudent.isEmpty() || optionalClasse.isEmpty())
            return null;

        Student student = optionalStudent.get();
        Classe classe = optionalClasse.get();

        if (!student.getClasses().contains(classe)) {
            student.getClasses().add(classe);
        }

        if (!classe.getStudents().contains(student)) {
            classe.getStudents().add(student);
        }
        studentRepository.save(student);
        classeRepository.save(classe);
        return new StudentClasseResponse(student, classe);
    }

    public StudentClasseResponse removeStudentFromClasse(Long studentId, Long classeId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        Optional<Classe> optionalClasse = classeRepository.findById(classeId);

        if (optionalStudent.isEmpty() || optionalClasse.isEmpty())
            return null;

        Student student = optionalStudent.get();
        Classe classe = optionalClasse.get();

        if (!student.getClasses().contains(classe)) {
            student.getClasses().remove(classe);
        }

        if (!classe.getStudents().contains(student)) {
            classe.getStudents().remove(student);
        }
        studentRepository.save(student);
        classeRepository.save(classe);
        return new StudentClasseResponse(student, classe);

    }

    public List<Classe> getClassesOfStudent(Long studentId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isEmpty())
            return new ArrayList<>();
        Student student = optionalStudent.get();
        return student.getClasses();
    }

    public List<Student> getStudentsOfClasse(Long classeId) {
        Optional<Classe> optionalClasse = classeRepository.findById(classeId);
        if (optionalClasse.isEmpty())
            return new ArrayList<>();

        Classe classe = optionalClasse.get();
        return classe.getStudents();
    }
}
