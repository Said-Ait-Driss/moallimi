package com.moallimi.moallimi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.model.DiplomAndCertaficate;
import com.moallimi.moallimi.repository.DiplomAndCertaficateRepository;

@Service
public class DiplomAndCertaficateService {

    @Autowired
    private DiplomAndCertaficateRepository diplomAndCertaficateRepository;

    public DiplomAndCertaficate addDiplomOrCertaficate(DiplomAndCertaficate diplomOrCertaficate) {
        return diplomAndCertaficateRepository.save(diplomOrCertaficate);
    }

    public DiplomAndCertaficate updateDiplomOrCertaficate(DiplomAndCertaficate diplomOrCertaficate) {
        return diplomAndCertaficateRepository.save(diplomOrCertaficate);
    }

    public DiplomAndCertaficate deleteDiplomOrCertaficate(Long diplomOrCertaficateId){
        DiplomAndCertaficate diplomOrCertaficate = diplomAndCertaficateRepository.findById(diplomOrCertaficateId).orElse(null);
        if(diplomOrCertaficate != null){
            diplomOrCertaficate.setIsDeleted(true);
            diplomAndCertaficateRepository.save(diplomOrCertaficate);
        }
        return diplomOrCertaficate;
    }

    public List<DiplomAndCertaficate> getAllDiplomOrCertaficateOfTeacher(Long teacherID) {
        return diplomAndCertaficateRepository.findByTeacherId(teacherID);
    }

}
