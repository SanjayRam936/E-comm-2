package com.example.shopshield.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "resolutions", schema = "compliance")
public class Resolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resolution_id")
    private Long resolutionId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "violation_id", nullable = false)
    private Violation violation;

    private String notes;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
}
