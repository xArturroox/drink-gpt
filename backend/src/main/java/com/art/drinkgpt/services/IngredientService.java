package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.dto.IngredientRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IngredientService {
    Page<IngredientDTO> getAllIngredients(Pageable pageable, Boolean available);
    IngredientDTO getIngredientById(Long id);
    IngredientDTO createIngredient(IngredientRequestDTO request);
    IngredientDTO updateIngredient(Long id, IngredientRequestDTO request);
    void deleteIngredient(Long id);
} 