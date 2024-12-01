package com.moallimi.moallimi;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.moallimi.moallimi.security.CustomCorsConfiguration;

public class WebConfig implements WebMvcConfigurer {
    @Bean
    public CustomCorsConfiguration customCorsConfiguration() {
        return new CustomCorsConfiguration();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Adjust the path as needed
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true) // If you want to allow credentials
                .maxAge(3600);
    }
}
