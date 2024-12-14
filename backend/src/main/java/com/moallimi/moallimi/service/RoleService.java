package com.moallimi.moallimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.model.Role;
import com.moallimi.moallimi.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public void createRolesIfNotExists() {
        for (EnumRole enumRole : EnumRole.values()) {
            if (roleRepository.findByName(enumRole).isEmpty()) { 
                Role role = new Role(enumRole);
                roleRepository.save(role);
            }
        }
    }

}
