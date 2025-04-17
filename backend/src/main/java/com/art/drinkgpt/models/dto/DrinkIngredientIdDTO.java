package com.art.drinkgpt.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkIngredientIdDTO {
    private Integer drinkId;
    private Integer ingredientId;
}
