package com.art.drinkgpt.models.dto;

import lombok.Data;

@Data
public class IngredientDTO {
    private Long id;
    private String name;
    private Boolean available;
} 