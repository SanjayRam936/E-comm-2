package com.example.shopshield.service;

import com.example.shopshield.model.Product;
import com.example.shopshield.model.Violation;
import com.example.shopshield.repository.ProductRepository;
import com.example.shopshield.repository.ViolationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LegalMetrologyComplianceService {

    private static final Logger logger = LoggerFactory.getLogger(LegalMetrologyComplianceService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ViolationRepository violationRepository;

    /**
     * This method is scheduled to run periodically (e.g., every hour) to check for compliance violations.
     * It iterates through all products and applies a set of predefined rules based on the Legal Metrology Act.
     * If a violation is detected, a new record is created in the 'violations' table.
     */
    @Scheduled(fixedRate = 3600000) // Runs every hour
    public void checkForComplianceViolations() {
        logger.info("Starting scheduled compliance check...");
        List<Product> products = productRepository.findAll();

        for (Product product : products) {
            // Rule 1: Check for missing mandatory declarations (e.g., weight, price)
            if (product.getWeight() == null || product.getWeight() <= 0) {
                createViolation(product, "LM_RULE_01", "Product weight is missing or invalid.");
            }
            if (product.getPrice() == null || product.getPrice().doubleValue() <= 0) {
                createViolation(product, "LM_RULE_02", "Product price is missing or invalid.");
            }
            if (product.getPackagingInfo() == null || product.getPackagingInfo().isBlank()) {
                createViolation(product, "LM_RULE_03", "Packaging information is missing.");
            }

            // Rule 2: Add more complex rules as needed.
            // For example, checking for standard units of weight/volume, MRP declarations, etc.
            // This is a simplified example. A real implementation would have more sophisticated rule logic.

            product.setLastCheckedTimestamp(LocalDateTime.now());
            productRepository.save(product);
        }
        logger.info("Scheduled compliance check finished.");
    }

    private void createViolation(Product product, String ruleCode, String description) {
        Violation violation = new Violation();
        violation.setProduct(product);
        violation.setViolatedRuleCode(ruleCode);
        violation.setViolatedRuleDescription(description);
        violation.setDetectedAt(LocalDateTime.now());
        violation.setStatus(Violation.ViolationStatus.UNRESOLVED);
        violationRepository.save(violation);
        logger.warn("Violation detected for product ID {}: {}", product.getProductId(), description);
    }
}