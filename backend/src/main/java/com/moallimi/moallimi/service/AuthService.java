package com.moallimi.moallimi.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moallimi.moallimi.enums.EnumRole;
import com.moallimi.moallimi.model.Admin;
import com.moallimi.moallimi.model.Parent;
import com.moallimi.moallimi.model.Role;
import com.moallimi.moallimi.model.Student;
import com.moallimi.moallimi.model.Teacher;
import com.moallimi.moallimi.model.User;
import com.moallimi.moallimi.payload.request.SignupRequest;
import com.moallimi.moallimi.payload.response.MessageResponse;
import com.moallimi.moallimi.repository.RoleRepository;
import com.moallimi.moallimi.repository.UserRepository;
import com.moallimi.moallimi.security.services.UserDetailsImpl;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    public UserDetailsImpl signIn(String username, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return (UserDetailsImpl) authentication.getPrincipal();
    }

    public boolean register(SignupRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return false;
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return false;
        }
        // Create new user's account
        User user = null;

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(EnumRole.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            user = new Student();
        } else {
            for (String role : strRoles) {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(EnumRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        user = new Admin();

                        break;

                    case "parent":
                        Role parentRole = roleRepository.findByName(EnumRole.ROLE_PARENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(parentRole);
                        user = new Parent();
                        break;

                    case "teacher":
                        Role teacherRole = roleRepository.findByName(EnumRole.ROLE_TEACHER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(teacherRole);
                        user = new Teacher();
                        break;

                    default:
                        Role userRole = roleRepository.findByName(EnumRole.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                        user = new Student();

                        break;
                }
            }
        }
        if (user != null) {
            user.setEmail(signUpRequest.getEmail());
            user.setUsername(signUpRequest.getUsername());
            user.setPassword(encoder.encode(signUpRequest.getPassword()));
            user.setRoles(roles);
        }

        if (user == null) {
            return false;
        }
        User savedUser = userRepository.save(user);
        return savedUser != null;
    }
}
