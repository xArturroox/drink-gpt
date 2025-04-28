package com.art.drinkgpt.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrinkIngredientDTO {
    private IngredientDTO ingredient;
    private Float quantity;
    private String unit;
} 