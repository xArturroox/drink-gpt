package com.art.drinkgpt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        // Przekierowanie ścieżek do odpowiednich plików HTML
        registry.addViewController("/login").setViewName("forward:/login/index.html");
        registry.addViewController("/host/orders").setViewName("forward:/host/orders/index.html");
        registry.addViewController("/host/ingredients").setViewName("forward:/host/ingredients/index.html");
        registry.addViewController("/host/drinks").setViewName("forward:/host/drinks/index.html");
        registry.addViewController("/logout").setViewName("forward:/logout/index.html");
    }

} 