package com.moallimi.moallimi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.moallimi.moallimi.model.DiplomAndCertaficate;
import com.moallimi.moallimi.service.DiplomAndCertaficateService;

@Controller
@RequestMapping("/diplom")
public class DiplomAndCertaficateController extends BaseController{

    @Autowired
    private DiplomAndCertaficateService diplomAndCertificateService;

    @PostMapping("/add")
    public DiplomAndCertaficate addDiplomOrCertaficate(@RequestBody DiplomAndCertaficate diplomAndCertificate) {
        return diplomAndCertificateService.addDiplomOrCertaficate(diplomAndCertificate);
    }

    @PutMapping("/update")
    public DiplomAndCertaficate updateDiplomOrCertaficate(@RequestBody DiplomAndCertaficate diplomAndCertificate) {
        return diplomAndCertificateService.updateDiplomOrCertaficate(diplomAndCertificate);
    }

    @DeleteMapping("/delete/{id}")
    public DiplomAndCertaficate deleteDiplomOrCertaficate(@PathVariable Long id) {
        return diplomAndCertificateService.deleteDiplomOrCertaficate(id);
    }

    @GetMapping("/of-teacher/{teacherId}")
    public List<DiplomAndCertaficate> getAllDiplomOrCertaficateOfTeacher(@PathVariable Long teacherId) {
        return diplomAndCertificateService.getAllDiplomOrCertaficateOfTeacher(teacherId);
    }
}
