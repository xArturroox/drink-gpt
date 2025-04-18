package com.art.drinkgpt.services.impl;

import com.art.drinkgpt.models.dto.DrinkDTO;
import com.art.drinkgpt.models.dto.DrinkIngredientDTO;
import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.entities.Drink;
import com.art.drinkgpt.models.entities.DrinkIngredient;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.DrinkRepository;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.DrinkService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DrinkServiceImpl implements DrinkService {

    private final DrinkRepository drinkRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<DrinkDTO> getAllDrinks(Pageable pageable, Long ingredientId) {
        Page<Drink> drinks = ingredientId != null
                ? drinkRepository.findByIngredientId(ingredientId, pageable)
                : drinkRepository.findAll(pageable);
        return drinks.map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public DrinkDTO getDrinkById(Long id) {
        return drinkRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Drink not found with id: " + id));
    }

    @Override
    @Transactional
    public DrinkDTO createDrink(DrinkDTO request) {
        Drink drink = new Drink();
        updateDrinkFromRequest(drink, request);
        return mapToDTO(drinkRepository.save(drink));
    }

    @Override
    @Transactional
    public DrinkDTO updateDrink(Long id, DrinkDTO request) {;
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drink not found with id: " + id));
        updateDrinkFromRequest(drink, request);
        return mapToDTO(drinkRepository.save(drink));
    }

    @Override
    @Transactional
    public void deleteDrink(Long id) {
        log.debug("Deleting drink with id: {}", id);
        if (!drinkRepository.existsById(id)) {
            throw new EntityNotFoundException("Drink not found with id: " + id);
        }
        drinkRepository.deleteById(id);
    }

    private void updateDrinkFromRequest(Drink drink, DrinkDTO request) {
        drink.setName(request.getName());
        drink.setRecipe(request.getRecipe());
        
        // Update ingredients
        Set<DrinkIngredient> drinkIngredients = new HashSet<>();
        for (DrinkIngredientDTO ingredientDTO : request.getIngredients()) {
            Ingredient ingredient = ingredientRepository.findById(ingredientDTO.getIngredient().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Ingredient not found with id: " + ingredientDTO.getIngredient().getId()));
            
            DrinkIngredient drinkIngredient = new DrinkIngredient();
            drinkIngredient.setDrink(drink);
            drinkIngredient.setIngredient(ingredient);
            drinkIngredient.setQuantity(ingredientDTO.getQuantity());
            drinkIngredients.add(drinkIngredient);
        }
        
        drink.getDrinkIngredients().clear();
        drink.getDrinkIngredients().addAll(drinkIngredients);
    }

    private DrinkDTO mapToDTO(Drink drink) {
        List<DrinkIngredientDTO> ingredients = drink.getDrinkIngredients().stream()
                .map(di -> new DrinkIngredientDTO(
                        new IngredientDTO(di.getIngredient().getId(), di.getIngredient().getName(), di.getIngredient().getAvailable()),
                        di.getQuantity(),
                        di.getUnit()
                ))
                .collect(Collectors.toList());

        return new DrinkDTO(
                drink.getId(),
                drink.getName(),
                ingredients,
                drink.getRecipe()
        );
    }
} 