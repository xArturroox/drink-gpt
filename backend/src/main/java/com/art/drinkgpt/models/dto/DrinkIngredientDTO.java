package com.art.drinkgpt.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkIngredientDTO {
    private DrinkIngredientIdDTO id;
    private Float quantity;
    private String unit;
} 