package com.example.shopshield.service;

import com.example.shopshield.model.CvScanResult;
import com.example.shopshield.model.OcrScanResult;
import org.springframework.web.multipart.MultipartFile;

public interface ScanOrchestrationService {
    OcrScanResult performOcrScan(MultipartFile image, Long userId);
    CvScanResult performFakeProductDetection(MultipartFile image, Long userId);
}