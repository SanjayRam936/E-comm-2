package com.example.shopshield.service;

import com.example.shopshield.dto.ScanResult;
import com.example.shopshield.model.CvScanResult;
import com.example.shopshield.model.OcrScanResult;
import com.example.shopshield.model.Violation;
import com.example.shopshield.repository.ViolationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ComplianceServiceImpl implements ComplianceService {

    @Autowired
    private ViolationRepository violationRepository;

    @Autowired
    private ScanOrchestrationService scanOrchestrationService;

    @Override
    public List<Violation> getAllViolations() {
        return violationRepository.findAll();
    }

    @Override
    public List<Violation> getViolationsByStatus(Violation.ViolationStatus status) {
        return violationRepository.findByStatus(status);
    }

    @Override
    public ScanResult scanProductImage(MultipartFile file) {
        // For simplicity, we are not passing a user ID. In a real application, you would get the user from the security context.
        OcrScanResult ocrResult = scanOrchestrationService.performOcrScan(file, null);
        CvScanResult cvResult = scanOrchestrationService.performFakeProductDetection(file, null);

        ScanResult.OcrResult ocrDto = new ScanResult.OcrResult(ocrResult.getComplianceResult(), ocrResult.getExtractedText());
        ScanResult.CvResult cvDto = new ScanResult.CvResult(cvResult.getDetectionResult(), cvResult.getConfidenceScore() > 0.8, cvResult.getConfidenceScore());

        return new ScanResult(ocrDto, cvDto);
    }

    @Override
    public Page<Violation> findAllViolations(String status, Pageable pageable) {
        if (status != null && !status.isEmpty()) {
            return violationRepository.findByStatus(Violation.ViolationStatus.valueOf(status.toUpperCase()), pageable);
        }
        return violationRepository.findAll(pageable);
    }

    @Override
    public Optional<Violation> findViolationById(Long violationId) {
        return violationRepository.findById(violationId);
    }
}