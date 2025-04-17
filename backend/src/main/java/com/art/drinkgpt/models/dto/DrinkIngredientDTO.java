package com.art.drinkgpt.models.dto;

import lombok.Data;

@Data
public class DrinkIngredientDTO {
    private IngredientDTO ingredient;
    private Float quantity;
    private String unit;
} 