package com.fleetlogistics.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI fleetLogisticsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Fleet & Logistics Operations Suite REST API")
                        .description("Enterprise REST API combining FleetPulse, RouteWise, and Logistics Performance Intelligence. Provides fleet health, driver allocation, GPS tracking, and AI anomaly detection.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Prasun Nandi")
                                .email("prasunnandi18@gmail.com")
                                .url("https://github.com/Prasunnandi/fleet-logistics-operations-suite"))
                        .license(new License().name("MIT").url("https://opensource.org/licenses/MIT")));
    }
}
