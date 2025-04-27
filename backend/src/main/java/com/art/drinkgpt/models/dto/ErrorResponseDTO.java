package com.art.drinkgpt.models.dto;

import java.util.Map;

public record ErrorResponseDTO(
        Map<String, String> errors,
        String message
) {
    public static ErrorResponseDTO of(String message) {
        return new ErrorResponseDTO(null, message);
    }

    public static ErrorResponseDTO of(Map<String, String> errors) {
        return new ErrorResponseDTO(errors, null);
    }
} 