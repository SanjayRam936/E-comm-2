package com.example.shopshield.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "violations", schema = "compliance")
public class Violation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "violation_id")
    private Long violationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "violated_rule_code")
    private String violatedRuleCode;

    @Column(name = "violated_rule_description")
    private String violatedRuleDescription;

    @Column(name = "detected_at")
    private LocalDateTime detectedAt;

    @Enumerated(EnumType.STRING)
    private ViolationStatus status;

    @Column(name = "resolution_timestamp")
    private LocalDateTime resolutionTimestamp;

    public enum ViolationStatus {
        RESOLVED,
        UNRESOLVED
    }
}
