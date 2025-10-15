package com.example.shopshield.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Assuming OcrResult and CvResult have these fields based on the other prompts
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScanResult {

    private OcrResult ocrResult;
    private CvResult cvResult;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OcrResult {
        private String status;
        private String extractedText;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CvResult {
        private String status;
        private boolean isFake;
        private double confidenceScore;
    }
}
