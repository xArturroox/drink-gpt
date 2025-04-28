package com.art.drinkgpt.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrinkDTO {
    private Integer id;
    private String name;
    private List<DrinkIngredientDTO> ingredients; // List representing the relationship between a Drink and its Ingredients
    private String recipe;
} 