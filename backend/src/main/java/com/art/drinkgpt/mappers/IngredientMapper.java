package com.art.drinkgpt.mappers;

import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.models.dto.IngredientDTO;

public class IngredientMapper {
    public static IngredientDTO toDto(Ingredient ingredient) {
        if (ingredient == null) return null;
        IngredientDTO dto = new IngredientDTO();
        dto.setId(ingredient.getId());
        dto.setName(ingredient.getName());
        dto.setAvailable(ingredient.getAvailable());
        return dto;
    }

    public static Ingredient toEntity(IngredientDTO dto) {
        if (dto == null) return null;
        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getId());
        ingredient.setName(dto.getName());
        ingredient.setAvailable(dto.getAvailable());
        return ingredient;
    }
} 