package com.example.shopshield.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ocr_scan_results", schema = "ocr_service")
public class OcrScanResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "extracted_text", columnDefinition = "TEXT")
    private String extractedText;

    @Column(name = "scan_metadata", columnDefinition = "JSONB")
    private String scanMetadata; // Store as JSON string

    @Column(name = "compliance_result")
    private String complianceResult;

    @Column(name = "scanned_at")
    private LocalDateTime scannedAt;
}