package com.example.shopshield.service;

import com.example.shopshield.model.CvScanResult;
import com.example.shopshield.model.OcrScanResult;
import com.example.shopshield.repository.CvScanResultRepository;
import com.example.shopshield.repository.OcrScanResultRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ScanOrchestrationServiceImpl implements ScanOrchestrationService {

    @Autowired
    private OcrScanResultRepository ocrScanResultRepository;

    @Autowired
    private CvScanResultRepository cvScanResultRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${microservice.ocr.url}")
    private String ocrServiceUrl;

    @Value("${microservice.cv.url}")
    private String cvServiceUrl;

    /**
     * Orchestrates the OCR scan by calling the external OCR microservice.
     * @param image The image file to scan.
     * @param userId The ID of the user performing the scan.
     * @return The saved OcrScanResult.
     */
    @Override
    public OcrScanResult performOcrScan(MultipartFile image, Long userId) {
        // 1. Prepare the request for the OCR microservice
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try {
            body.add("file", new ByteArrayResource(image.getBytes()) {
                @Override
                public String getFilename() {
                    return image.getOriginalFilename();
                }
            });
        } catch (IOException e) {
            throw new RuntimeException("Failed to read image file", e);
        }

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 2. Call the OCR microservice
        JsonNode response = restTemplate.postForObject(ocrServiceUrl, requestEntity, JsonNode.class);

        // 3. Process the response and save to the database
        OcrScanResult result = new OcrScanResult();
        result.setUserId(userId);
        result.setImagePath(image.getOriginalFilename()); // In a real app, this would be a URL to stored image
        result.setExtractedText(response.get("extracted_text").asText());
        result.setScanMetadata(response.get("scan_metadata").toString());
        result.setComplianceResult(response.get("compliance_result").asText());
        result.setScannedAt(LocalDateTime.now());

        return ocrScanResultRepository.save(result);
    }

    /**
     * Orchestrates the fake product detection by calling the external CV microservice.
     * @param image The image file to analyze.
     * @param userId The ID of the user performing the detection.
     * @return The saved CvScanResult.
     */
    @Override
    public CvScanResult performFakeProductDetection(MultipartFile image, Long userId) {
        // 1. Prepare the request for the CV microservice
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try {
            body.add("file", new ByteArrayResource(image.getBytes()) {
                @Override
                public String getFilename() {
                    return image.getOriginalFilename();
                }
            });
        } catch (IOException e) {
            throw new RuntimeException("Failed to read image file", e);
        }

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 2. Call the CV microservice
        JsonNode response = restTemplate.postForObject(cvServiceUrl, requestEntity, JsonNode.class);

        // 3. Process the response and save to the database
        CvScanResult result = new CvScanResult();
        result.setUserId(userId);
        result.setImagePath(image.getOriginalFilename()); // Again, this would be a URL
        result.setDetectionResult(response.get("detection_result").asText());
        result.setConfidenceScore(response.get("confidence_score").asDouble());
        result.setAnalyzedAt(LocalDateTime.now());

        return cvScanResultRepository.save(result);
    }
}