package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.dto.IngredientRequestDTO;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.impl.IngredientServiceImpl;
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

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientServiceImpl ingredientService;

    private Ingredient ingredient;
    private IngredientRequestDTO requestDTO;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        ingredient = new Ingredient();
        ingredient.setId(1);
        ingredient.setName("Vodka");
        ingredient.setAvailable(true);

        requestDTO = new IngredientRequestDTO();
        requestDTO.setName("Vodka");
        requestDTO.setAvailable(true);

        pageable = PageRequest.of(0, 10);
    }

    @Test
    void getAllIngredients_ShouldReturnPageOfIngredientDTOs() {
        // Given
        Page<Ingredient> ingredientPage = new PageImpl<>(List.of(ingredient));
        when(ingredientRepository.findAll(pageable)).thenReturn(ingredientPage);

        // When
        Page<IngredientDTO> result = ingredientService.getAllIngredients(pageable, null);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Vodka", result.getContent().get(0).getName());
        verify(ingredientRepository).findAll(pageable);
    }

    @Test
    void getAllIngredients_WithAvailableFilter_ShouldFilterByAvailability() {
        // Given
        Page<Ingredient> ingredientPage = new PageImpl<>(List.of(ingredient));
        when(ingredientRepository.findByAvailable(true, pageable)).thenReturn(ingredientPage);

        // When
        Page<IngredientDTO> result = ingredientService.getAllIngredients(pageable, true);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(ingredientRepository).findByAvailable(true, pageable);
    }

    @Test
    void getIngredientById_WhenExists_ShouldReturnIngredientDTO() {
        // Given
        when(ingredientRepository.findById(1)).thenReturn(Optional.of(ingredient));

        // When
        IngredientDTO result = ingredientService.getIngredientById(1);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Vodka", result.getName());
        assertTrue(result.getAvailable());
    }

    @Test
    void getIngredientById_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(ingredientRepository.findById(1)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> ingredientService.getIngredientById(1));
    }

    @Test
    void createIngredient_ShouldReturnCreatedIngredientDTO() {
        // Given
        when(ingredientRepository.save(any(Ingredient.class))).thenReturn(ingredient);

        // When
        IngredientDTO result = ingredientService.createIngredient(requestDTO);

        // Then
        assertNotNull(result);
        assertEquals("Vodka", result.getName());
        assertTrue(result.getAvailable());
        verify(ingredientRepository).save(any(Ingredient.class));
    }

    @Test
    void updateIngredient_WhenExists_ShouldReturnUpdatedIngredientDTO() {
        // Given
        when(ingredientRepository.findById(1)).thenReturn(Optional.of(ingredient));
        when(ingredientRepository.save(any(Ingredient.class))).thenReturn(ingredient);

        requestDTO.setName("Gin");
        requestDTO.setAvailable(false);

        // When
        IngredientDTO result = ingredientService.updateIngredient(1, requestDTO);

        // Then
        assertNotNull(result);
        verify(ingredientRepository).findById(1);
        verify(ingredientRepository).save(any(Ingredient.class));
    }

    @Test
    void updateIngredient_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(ingredientRepository.findById(1)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> ingredientService.updateIngredient(1, requestDTO));
    }

    @Test
    void deleteIngredient_WhenExists_ShouldDeleteSuccessfully() {
        // Given
        when(ingredientRepository.existsById(1)).thenReturn(true);
        doNothing().when(ingredientRepository).deleteById(1);

        // When
        ingredientService.deleteIngredient(1);

        // Then
        verify(ingredientRepository).existsById(1);
        verify(ingredientRepository).deleteById(1);
    }

    @Test
    void deleteIngredient_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(ingredientRepository.existsById(1)).thenReturn(false);

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> ingredientService.deleteIngredient(1));
    }
} 