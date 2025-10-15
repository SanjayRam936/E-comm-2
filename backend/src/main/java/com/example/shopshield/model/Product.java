package com.example.shopshield.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products", schema = "compliance")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    private String name;
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    private Double weight;
    private BigDecimal price;

    @Column(name = "packaging_info")
    private String packagingInfo;

    @Column(name = "last_checked_timestamp")
    private LocalDateTime lastCheckedTimestamp;
}
