package com.example.shopshield.repository;

import com.example.shopshield.model.CvScanResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvScanResultRepository extends JpaRepository<CvScanResult, Long> {
    List<CvScanResult> findByUserId(Long userId);
}