package com.example.shopshield;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ShopshieldApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopshieldApplication.class, args);
    }

}
