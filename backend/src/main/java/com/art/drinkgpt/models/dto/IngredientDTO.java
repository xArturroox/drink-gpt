package com.art.drinkgpt.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IngredientDTO {
    private Integer id;
    private String name;
    private Boolean available;
} 