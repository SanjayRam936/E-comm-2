package com.example.shopshield.controller;

import com.example.shopshield.model.CvScanResult;
import com.example.shopshield.model.OcrScanResult;
import com.example.shopshield.security.UserDetailsImpl;
import com.example.shopshield.service.ScanOrchestrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/scans")
public class ScanController {

    @Autowired
    private ScanOrchestrationService scanOrchestrationService;

    @PostMapping("/ocr")
    public ResponseEntity<OcrScanResult> ocrScan(@RequestParam("image") MultipartFile image, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        OcrScanResult result = scanOrchestrationService.performOcrScan(image, userDetails.getId());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/fake-product")
    public ResponseEntity<CvScanResult> fakeProductScan(@RequestParam("image") MultipartFile image, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        CvScanResult result = scanOrchestrationService.performFakeProductDetection(image, userDetails.getId());
        return ResponseEntity.ok(result);
    }
}