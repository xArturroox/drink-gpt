package com.art.drinkgpt.services.impl;

import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.dto.IngredientRequestDTO;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.IngredientService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<IngredientDTO> getAllIngredients(Pageable pageable, Boolean available) {
        log.debug("Getting all ingredients with pageable: {} and available: {}", pageable, available);
        Page<Ingredient> ingredients = available != null
                ? ingredientRepository.findByAvailable(available, pageable)
                : ingredientRepository.findAll(pageable);
        return ingredients.map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public IngredientDTO getIngredientById(Long id) {
        log.debug("Getting ingredient by id: {}", id);
        return ingredientRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Ingredient not found with id: " + id));
    }

    @Override
    @Transactional
    public IngredientDTO createIngredient(IngredientRequestDTO request) {
        log.debug("Creating new ingredient: {}", request);
        Ingredient ingredient = new Ingredient();
        updateIngredientFromRequest(ingredient, request);
        return mapToDTO(ingredientRepository.save(ingredient));
    }

    @Override
    @Transactional
    public IngredientDTO updateIngredient(Long id, IngredientRequestDTO request) {
        log.debug("Updating ingredient with id: {} and request: {}", id, request);
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingredient not found with id: " + id));
        updateIngredientFromRequest(ingredient, request);
        return mapToDTO(ingredientRepository.save(ingredient));
    }

    @Override
    @Transactional
    public void deleteIngredient(Long id) {
        log.debug("Deleting ingredient with id: {}", id);
        if (!ingredientRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingredient not found with id: " + id);
        }
        ingredientRepository.deleteById(id);
    }

    private void updateIngredientFromRequest(Ingredient ingredient, IngredientRequestDTO request) {
        ingredient.setName(request.getName());
        ingredient.setAvailable(request.getAvailable());
    }

    private IngredientDTO mapToDTO(Ingredient ingredient) {
        return new IngredientDTO(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getAvailable()
        );
    }
} 