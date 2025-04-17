package com.art.drinkgpt.mappers;

import com.art.drinkgpt.models.entities.DrinkOrder;
import com.art.drinkgpt.models.dto.DrinkOrderDTO;

public class DrinkOrderMapper {
    public static DrinkOrderDTO toDto(DrinkOrder drinkOrder) {
        if (drinkOrder == null) return null;
        DrinkOrderDTO dto = new DrinkOrderDTO();
        dto.setId(drinkOrder.getId());
        dto.setDrinkName(drinkOrder.getDrinkName());
        dto.setIngredients(drinkOrder.getIngredients());
        dto.setRecipe(drinkOrder.getRecipe());
        dto.setGuestName(drinkOrder.getGuestName());
        dto.setOrderTimestamp(drinkOrder.getOrderTimestamp());
        dto.setServed(drinkOrder.isServed());
        return dto;
    }

    public static DrinkOrder toEntity(DrinkOrderDTO dto) {
        if (dto == null) return null;
        DrinkOrder drinkOrder = new DrinkOrder();
        drinkOrder.setId(dto.getId());
        drinkOrder.setDrinkName(dto.getDrinkName());
        drinkOrder.setIngredients(dto.getIngredients());
        drinkOrder.setRecipe(dto.getRecipe());
        drinkOrder.setGuestName(dto.getGuestName());
        drinkOrder.setOrderTimestamp(dto.getOrderTimestamp());
        drinkOrder.setServed(dto.isServed());
        return drinkOrder;
    }
} 