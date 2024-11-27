package com.cooksys.groupfinal;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200"); // Allow specific frontend origin
        config.addAllowedMethod("*"); // Allow all HTTP methods
        config.addAllowedHeader("*"); // Allow all headers
        config.setAllowCredentials(true); // Allow credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply CORS to all endpoints
        return new CorsFilter(source);
    }
}
