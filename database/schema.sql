-- Create schemas for different services
CREATE SCHEMA IF NOT EXISTS backend;
CREATE SCHEMA IF NOT EXISTS ocr_service;
CREATE SCHEMA IF NOT EXISTS cv_service;
CREATE SCHEMA IF NOT EXISTS compliance;

-- Table for application users in the backend schema
-- Stores user information for authentication and authorization.
CREATE TABLE backend.app_users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMPTZ
);

-- Table for OCR scan results in the ocr_service schema
-- Stores the raw text extracted from product images.
CREATE TABLE ocr_service.ocr_scans (
    scan_id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(2048) NOT NULL,
    extracted_text TEXT,
    scan_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for Computer Vision scan results in the cv_service schema
-- Stores results from the fake product detection analysis.
CREATE TABLE cv_service.cv_scans (
    scan_id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(2048) NOT NULL,
    detection_result VARCHAR(255),
    confidence_score NUMERIC(5, 4),
    scan_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for products in the compliance schema
-- This table holds product information relevant for legal metrology compliance checks.
CREATE TABLE compliance.products (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(2048),
    weight NUMERIC(10, 2),
    price NUMERIC(10, 2),
    packaging_info TEXT,
    last_checked_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for compliance violations in the compliance schema
-- Records any detected violations of the Legal Metrology Act for a given product.
CREATE TABLE compliance.violations (
    violation_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    violated_rule_code VARCHAR(50),
    violated_rule_description TEXT,
    detected_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'unresolved' CHECK (status IN ('resolved', 'unresolved')),
    resolution_timestamp TIMESTAMPTZ,
    CONSTRAINT fk_product
        FOREIGN KEY(product_id)
        REFERENCES compliance.products(product_id)
        ON DELETE CASCADE
);

-- Table for violation resolutions in the compliance schema
-- Tracks the resolution process for a specific violation.
CREATE TABLE compliance.resolutions (
    resolution_id BIGSERIAL PRIMARY KEY,
    violation_id BIGINT UNIQUE NOT NULL, -- A violation can only have one resolution
    notes TEXT,
    resolved_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_violation
        FOREIGN KEY(violation_id)
        REFERENCES compliance.violations(violation_id)
        ON DELETE CASCADE
);

-- Add comments on tables
COMMENT ON TABLE backend.app_users IS 'Stores user information for authentication and authorization.';
COMMENT ON TABLE ocr_service.ocr_scans IS 'Stores the raw text extracted from product images.';
COMMENT ON TABLE cv_service.cv_scans IS 'Stores results from the fake product detection analysis.';
COMMENT ON TABLE compliance.products IS 'Holds product information relevant for legal metrology compliance checks.';
COMMENT ON TABLE compliance.violations IS 'Records any detected violations of the Legal Metrology Act for a given product.';
COMMENT ON TABLE compliance.resolutions IS 'Tracks the resolution process for a specific violation.';
