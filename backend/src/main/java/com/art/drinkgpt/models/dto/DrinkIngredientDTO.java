package com.art.drinkgpt.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DrinkIngredientDTO {
    private IngredientDTO ingredient;
    private Float quantity;
    private String unit;
} 