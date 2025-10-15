package com.example.shopshield.repository;

import com.example.shopshield.model.Violation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViolationRepository extends JpaRepository<Violation, Long> {
    List<Violation> findByStatus(Violation.ViolationStatus status);
    Page<Violation> findByStatus(Violation.ViolationStatus status, Pageable pageable);
    List<Violation> findByProductProductId(Long productId);
}
