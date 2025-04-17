package com.art.drinkgpt.models.dto;

import lombok.Data;
import java.util.List;

@Data
public class DrinkDTO {
    private Long id;
    private String name;
    private List<DrinkIngredientDTO> ingredients; // List representing the relationship between a Drink and its Ingredients
    private String recipe;
} 