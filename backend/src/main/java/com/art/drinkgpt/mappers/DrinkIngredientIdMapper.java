package com.art.drinkgpt.mappers;

import com.art.drinkgpt.models.entities.DrinkIngredientId;
import com.art.drinkgpt.models.dto.DrinkIngredientIdDTO;

public class DrinkIngredientIdMapper {
    public static DrinkIngredientIdDTO toDto(DrinkIngredientId id) {
        if (id == null) return null;
        DrinkIngredientIdDTO dto = new DrinkIngredientIdDTO();
        dto.setDrinkId(id.getDrinkId());
        dto.setIngredientId(id.getIngredientId());
        return dto;
    }

    public static DrinkIngredientId toEntity(DrinkIngredientIdDTO dto) {
        if (dto == null) return null;
        DrinkIngredientId id = new DrinkIngredientId();
        id.setDrinkId(dto.getDrinkId());
        id.setIngredientId(dto.getIngredientId());
        return id;
    }
} 