package com.example.shopshield.service;

import com.example.shopshield.model.Product;
import com.example.shopshield.model.Violation;
import com.example.shopshield.repository.ProductRepository;
import com.example.shopshield.repository.ViolationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

/**
 * Service for automatically detecting anomalies in products based on Legal Metrology rules.
 */
@Service
public class LegalMetrologyAnomalyDetector {

    private final ProductRepository productRepository;
    private final ViolationRepository violationRepository;

    public LegalMetrologyAnomalyDetector(ProductRepository productRepository, ViolationRepository violationRepository) {
        this.productRepository = productRepository;
        this.violationRepository = violationRepository;
    }

    /**
     * Periodically checks all products for compliance with Legal Metrology rules.
     * This method is scheduled to run every hour.
     */
    @Scheduled(cron = "0 0 * * * ?")
    public void checkProductsForCompliance() {
        System.out.println("Starting hourly compliance check...");
        List<Product> products = productRepository.findAll();

        for (Product product : products) {
            // Placeholder for compliance checking logic.
            // In a real application, this would involve a set of rules to validate the product's properties.

            // Example 1: Check for missing mandatory price declaration.
            if (product.getPrice() == null || product.getPrice().doubleValue() <= 0) {
                createViolation(product, "LMA-RULE-01", "Missing or invalid price declaration.");
            }

            // Example 2: Check for non-standard weight.
            // This is a simplified example. Real rules are more complex.
            if (product.getWeight() != null && product.getWeight().doubleValue() % 50 != 0) {
                 createViolation(product, "LMA-RULE-08", "Non-standard weight detected. Weight should be in standard units.");
            }
            
            // Example 3: Check for missing packaging information
            if (product.getPackagingInfo() == null || product.getPackagingInfo().isBlank()) {
                createViolation(product, "LMA-RULE-04", "Missing mandatory packaging information.");
            }

            // Update the last checked timestamp
            product.setLastCheckedTimestamp(java.time.LocalDateTime.now());
            productRepository.save(product);
        }
        System.out.println("Hourly compliance check finished.");
    }

    private void createViolation(Product product, String ruleCode, String description) {
        System.out.printf("Violation found for product %d: %s%n", product.getProductId(), description);
        Violation violation = new Violation();
        violation.setProduct(product);
        violation.setViolatedRuleCode(ruleCode);
        violation.setViolatedRuleDescription(description);
        violation.setDetectedAt(java.time.LocalDateTime.now());
        violation.setStatus(Violation.ViolationStatus.UNRESOLVED);
        violationRepository.save(violation);
    }
}
