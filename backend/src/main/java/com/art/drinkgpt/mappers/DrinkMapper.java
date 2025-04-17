package com.art.drinkgpt.mappers;

import com.art.drinkgpt.models.entities.Drink;
import com.art.drinkgpt.models.dto.DrinkDTO;

public class DrinkMapper {
    public static DrinkDTO toDto(Drink drink) {
        if (drink == null) return null;
        DrinkDTO dto = new DrinkDTO();
        dto.setId(drink.getId());
        dto.setName(drink.getName());
        dto.setRecipe(drink.getRecipe());
        return dto;
    }

    public static Drink toEntity(DrinkDTO dto) {
        if (dto == null) return null;
        Drink drink = new Drink();
        drink.setId(dto.getId());
        drink.setName(dto.getName());
        drink.setRecipe(dto.getRecipe());
        return drink;
    }
} 