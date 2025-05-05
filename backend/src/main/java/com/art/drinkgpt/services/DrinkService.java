package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.DrinkDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DrinkService {
    Page<DrinkDTO> getAllDrinks(Pageable pageable, Integer ingredientId);
    DrinkDTO getDrinkById(Integer id);
    DrinkDTO createDrink(DrinkDTO request);
    DrinkDTO updateDrink(Integer id, DrinkDTO request);
    void deleteDrink(Integer id);
} 