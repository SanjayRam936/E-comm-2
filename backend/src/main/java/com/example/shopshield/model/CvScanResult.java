package com.example.shopshield.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cv_scan_results", schema = "cv_service")
public class CvScanResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "detection_result")
    private String detectionResult;

    @Column(name = "confidence_score")
    private Double confidenceScore;

    @Column(name = "analyzed_at")
    private LocalDateTime analyzedAt;
}