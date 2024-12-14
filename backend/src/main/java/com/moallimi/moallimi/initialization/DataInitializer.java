package com.moallimi.moallimi.initialization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.moallimi.moallimi.model.AcademicLevel;
import com.moallimi.moallimi.service.AcademicLevelService;
import com.moallimi.moallimi.service.LessonCategoryService;
import com.moallimi.moallimi.service.LessonTypeService;
import com.moallimi.moallimi.service.RoleService;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleService roleService;

    @Autowired
    private LessonTypeService lessonTypeService;

    @Autowired
    private LessonCategoryService lessonCategoryService;



    @Autowired
    private AcademicLevelService academicLevelService;

    @Override
    public void run(String... args) throws Exception {
        roleService.createRolesIfNotExists();
        lessonTypeService.createLessonTypesIfNotExists();
        lessonCategoryService.createLessonCategoryIfNotExists();
        academicLevelService.createAcademicLevelIfNotExists();
    }
}
