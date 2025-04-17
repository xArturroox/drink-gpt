package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.DrinkDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DrinkService {
    Page<DrinkDTO> getAllDrinks(Pageable pageable, Long ingredientId);
    DrinkDTO getDrinkById(Long id);
    DrinkDTO createDrink(DrinkDTO request);
    DrinkDTO updateDrink(Long id, DrinkDTO request);
    void deleteDrink(Long id);
} 