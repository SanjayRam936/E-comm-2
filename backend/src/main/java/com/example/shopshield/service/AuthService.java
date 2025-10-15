package com.example.shopshield.service;

import com.example.shopshield.dto.LoginRequest;
import com.example.shopshield.dto.SignUpRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> registerUser(SignUpRequest signUpRequest);
    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
}