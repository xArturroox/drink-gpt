package com.art.drinkgpt.controllers;

import com.art.drinkgpt.models.dto.IngredientDTO;
import com.art.drinkgpt.models.dto.IngredientRequestDTO;
import com.art.drinkgpt.services.IngredientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    public Page<IngredientDTO> getAllIngredients(Pageable pageable,
                                                 @RequestParam(required = false) Boolean available) {
        return ingredientService.getAllIngredients(pageable, available);
    }

    @GetMapping("/{id}")
    public IngredientDTO getIngredientById(@PathVariable Long id) {
        return ingredientService.getIngredientById(id);
    }

    @PostMapping
    public IngredientDTO createIngredient(@Valid @RequestBody IngredientRequestDTO request) {
        return ingredientService.createIngredient(request);
    }

    @PatchMapping("/{id}")
    public IngredientDTO updateIngredient(@PathVariable Long id,
                                          @Valid @RequestBody IngredientRequestDTO request) {

        return ingredientService.updateIngredient(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        ingredientService.deleteIngredient(id);
    }
}