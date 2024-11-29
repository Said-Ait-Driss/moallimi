package com.moallimi.moallimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moallimi.moallimi.model.Parent;
import com.moallimi.moallimi.service.ParentService;

@RestController
@RequestMapping("/parent")
public class ParentController extends BaseController{
    
    @Autowired
    private ParentService parentService;
    
    @PutMapping("/update")
    public Parent updateParent(@RequestBody Parent parent){
        return parentService.updateParent(parent);
    }
}
