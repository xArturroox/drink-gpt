package com.art.drinkgpt.models.dto;

import lombok.Data;

@Data
public class IngredientRequestDTO {
    private String name;
    private Boolean available;
} 