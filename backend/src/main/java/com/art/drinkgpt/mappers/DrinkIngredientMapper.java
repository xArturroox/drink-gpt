package com.art.drinkgpt.mappers;

import com.art.drinkgpt.models.entities.DrinkIngredient;
import com.art.drinkgpt.models.dto.DrinkIngredientDTO;

public class DrinkIngredientMapper {
    public static DrinkIngredientDTO toDto(DrinkIngredient drinkIngredient) {
        if (drinkIngredient == null) return null;
        DrinkIngredientDTO dto = new DrinkIngredientDTO();
        dto.setId(DrinkIngredientIdMapper.toDto(drinkIngredient.getId()));
        dto.setQuantity(drinkIngredient.getQuantity());
        dto.setUnit(drinkIngredient.getUnit());
        return dto;
    }

    public static DrinkIngredient toEntity(DrinkIngredientDTO dto) {
        if (dto == null) return null;
        DrinkIngredient drinkIngredient = new DrinkIngredient();
        drinkIngredient.setId(DrinkIngredientIdMapper.toEntity(dto.getId()));
        drinkIngredient.setQuantity(dto.getQuantity());
        drinkIngredient.setUnit(dto.getUnit());
        return drinkIngredient;
    }
} 