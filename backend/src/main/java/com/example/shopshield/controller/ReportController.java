package com.example.shopshield.controller;

import com.example.shopshield.model.CvScanResult;
import com.example.shopshield.model.OcrScanResult;
import com.example.shopshield.model.Violation;
import com.example.shopshield.repository.CvScanResultRepository;
import com.example.shopshield.repository.OcrScanResultRepository;
import com.example.shopshield.security.UserDetailsImpl;
import com.example.shopshield.service.ComplianceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ComplianceService complianceService;

    @Autowired
    private OcrScanResultRepository ocrScanResultRepository;

    @Autowired
    private CvScanResultRepository cvScanResultRepository;

    @GetMapping("/violations")
    public ResponseEntity<List<Violation>> getViolations(
            @RequestParam(required = false) Violation.ViolationStatus status) {
        List<Violation> violations;
        if (status != null) {
            violations = complianceService.getViolationsByStatus(status);
        } else {
            violations = complianceService.getAllViolations();
        }
        return ResponseEntity.ok(violations);
    }

    @GetMapping("/scans/history")
    public ResponseEntity<?> getScanHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<OcrScanResult> ocrHistory = ocrScanResultRepository.findByUserId(userDetails.getId());
        List<CvScanResult> cvHistory = cvScanResultRepository.findByUserId(userDetails.getId());

        Map<String, Object> history = new HashMap<>();
        history.put("ocrScans", ocrHistory);
        history.put("fakeProductDetections", cvHistory);

        return ResponseEntity.ok(history);
    }
}