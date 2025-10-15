package com.example.shopshield.controller;

import com.example.shopshield.dto.ScanResult;
import com.example.shopshield.model.Violation;
import com.example.shopshield.service.ComplianceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for handling product compliance checks and violation management.
 * This controller serves as the primary API gateway for the frontend application.
 */
@RestController
@RequestMapping("/api/v1/compliance")
public class ProductComplianceController {

    private final ComplianceService complianceService;

    public ProductComplianceController(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    /**
     * Handles the upload of a product image for scanning.
     * This endpoint orchestrates calls to the OCR and Fake Product Detection microservices.
     *
     * @param file The product image to be scanned (multipart/form-data).
     * @return A ResponseEntity containing the combined results from the scans.
     */
    @PostMapping("/products/scan")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ScanResult> scanProductImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        ScanResult result = complianceService.scanProductImage(file);
        return ResponseEntity.ok(result);
    }

    /**
     * Fetches a paginated list of all compliance violations.
     * Allows filtering by violation status.
     *
     * @param page   The page number to retrieve (0-indexed).
     * @param size   The number of items per page.
     * @param status Optional filter for the violation status (e.g., "unresolved", "resolved").
     * @return A ResponseEntity containing a Page of Violation objects.
     */
    @GetMapping("/violations")
    public ResponseEntity<Page<Violation>> getAllViolations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Violation> violations = complianceService.findAllViolations(status, pageable);
        return ResponseEntity.ok(violations);
    }

    /**
     * Retrieves the details for a single compliance violation by its ID.
     *
     * @param violationId The unique identifier of the violation.
     * @return A ResponseEntity containing the Violation object if found, otherwise a 404 Not Found response.
     */
    @GetMapping("/violations/{violationId}")
    public ResponseEntity<Violation> getViolationById(@PathVariable Long violationId) {
        return complianceService.findViolationById(violationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
