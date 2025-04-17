package com.art.drinkgpt.models.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class IngredientDTO {
    private Long id;
    private String name;
    private Boolean available;
} 