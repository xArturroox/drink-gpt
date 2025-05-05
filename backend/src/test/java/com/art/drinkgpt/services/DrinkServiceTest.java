package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.DrinkDTO;
import com.art.drinkgpt.models.dto.DrinkIngredientDTO;
import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.entities.Drink;
import com.art.drinkgpt.models.entities.DrinkIngredient;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.DrinkRepository;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.impl.DrinkServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DrinkServiceTest {

    @Mock
    private DrinkRepository drinkRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private DrinkServiceImpl drinkService;

    private Drink drink;
    private DrinkDTO drinkDTO;
    private Ingredient ingredient;
    private IngredientDTO ingredientDTO;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        pageable = PageRequest.of(0, 10);

        // Setup Ingredient
        ingredient = new Ingredient();
        ingredient.setId(1);
        ingredient.setName("Vodka");
        ingredient.setAvailable(true);

        ingredientDTO = new IngredientDTO(1, "Vodka", true);

        // Setup DrinkIngredient
        DrinkIngredient drinkIngredient = new DrinkIngredient();
        drinkIngredient.setIngredient(ingredient);
        drinkIngredient.setQuantity(50.0F);
        drinkIngredient.setUnit("ml");

        // Setup Drink
        drink = new Drink();
        drink.setId(1);
        drink.setName("Vodka Martini");
        drink.setRecipe("Shake with ice and strain into a martini glass");
        Set<DrinkIngredient> drinkIngredients = new HashSet<>();
        drinkIngredients.add(drinkIngredient);
        drink.setDrinkIngredients(drinkIngredients);

        // Setup DrinkDTO
        DrinkIngredientDTO drinkIngredientDTO = new DrinkIngredientDTO();
        drinkIngredientDTO.setIngredient(ingredientDTO);
        drinkIngredientDTO.setQuantity(50.0F);
        drinkIngredientDTO.setUnit("ml");

        drinkDTO = new DrinkDTO();
        drinkDTO.setId(1);
        drinkDTO.setName("Vodka Martini");
        drinkDTO.setIngredients(List.of(drinkIngredientDTO));
        drinkDTO.setRecipe("Shake with ice and strain into a martini glass");
    }

    @Test
    void getAllDrinks_ShouldReturnPageOfDrinkDTOs() {
        // Given
        Page<Drink> drinkPage = new PageImpl<>(List.of(drink));
        when(drinkRepository.findAll(pageable)).thenReturn(drinkPage);

        // When
        Page<DrinkDTO> result = drinkService.getAllDrinks(pageable, null);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Vodka Martini", result.getContent().get(0).getName());
        verify(drinkRepository).findAll(pageable);
    }

    @Test
    void getAllDrinks_WithIngredientFilter_ShouldFilterByIngredient() {
        // Given
        Page<Drink> drinkPage = new PageImpl<>(List.of(drink));
        when(drinkRepository.findByIngredientId(1, pageable)).thenReturn(drinkPage);

        // When
        Page<DrinkDTO> result = drinkService.getAllDrinks(pageable, 1);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(drinkRepository).findByIngredientId(1, pageable);
    }

    @Test
    void getDrinkById_WhenExists_ShouldReturnDrinkDTO() {
        // Given
        when(drinkRepository.findById(1)).thenReturn(Optional.of(drink));

        // When
        DrinkDTO result = drinkService.getDrinkById(1);

        // Then
        assertNotNull(result);
        assertEquals(Integer.valueOf(1), result.getId());
        assertEquals("Vodka Martini", result.getName());
    }

    @Test
    void getDrinkById_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(drinkRepository.findById(1)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> drinkService.getDrinkById(1));
    }

    @Test
    void createDrink_ShouldReturnCreatedDrinkDTO() {
        // Given
        when(ingredientRepository.findById(1)).thenReturn(Optional.of(ingredient));
        when(drinkRepository.save(any(Drink.class))).thenReturn(drink);

        // When
        DrinkDTO result = drinkService.createDrink(drinkDTO);

        // Then
        assertNotNull(result);
        assertEquals("Vodka Martini", result.getName());
    }

    @Test
    void updateDrink_WhenExists_ShouldReturnUpdatedDrinkDTO() {
        // Given
        when(drinkRepository.findById(1)).thenReturn(Optional.of(drink));
        when(ingredientRepository.findById(1)).thenReturn(Optional.of(ingredient));
        when(drinkRepository.save(any(Drink.class))).thenReturn(drink);

        // Set new values for update
        drinkDTO.setName("Dry Martini");
        drinkDTO.setRecipe("Stir gently with ice and strain into a chilled glass");

        // When
        DrinkDTO result = drinkService.updateDrink(1, drinkDTO);

        // Then
        assertNotNull(result);
        verify(drinkRepository).findById(1);
        verify(drinkRepository).save(any(Drink.class));
    }

    @Test
    void updateDrink_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(drinkRepository.findById(1)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> drinkService.updateDrink(1, drinkDTO));
    }

    @Test
    void deleteDrink_WhenExists_ShouldDeleteSuccessfully() {
        // Given
        when(drinkRepository.existsById(1)).thenReturn(true);
        doNothing().when(drinkRepository).deleteById(1);

        // When
        drinkService.deleteDrink(1);

        // Then
        verify(drinkRepository).existsById(1);
        verify(drinkRepository).deleteById(1);
    }

    @Test
    void deleteDrink_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(drinkRepository.existsById(1)).thenReturn(false);

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> drinkService.deleteDrink(1));
    }
} 