package com.example.shopshield.repository;

import com.example.shopshield.model.OcrScanResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OcrScanResultRepository extends JpaRepository<OcrScanResult, Long> {
    List<OcrScanResult> findByUserId(Long userId);
}