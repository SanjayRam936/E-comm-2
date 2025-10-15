package com.example.shopshield.service;

import com.example.shopshield.dto.ScanResult;
import com.example.shopshield.model.Violation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ComplianceService {
    List<Violation> getAllViolations();
    List<Violation> getViolationsByStatus(Violation.ViolationStatus status);

    ScanResult scanProductImage(MultipartFile file);

    Page<Violation> findAllViolations(String status, Pageable pageable);

    Optional<Violation> findViolationById(Long violationId);
}