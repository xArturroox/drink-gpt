package com.art.drinkgpt.controllers;

import com.art.drinkgpt.models.dto.DrinkDTO;
import com.art.drinkgpt.services.DrinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drinks")
@RequiredArgsConstructor
public class DrinkController {

    private final DrinkService drinkService;

    @GetMapping
    public Page<DrinkDTO> getAllDrinks(Pageable pageable,
                                     @RequestParam(required = false) Integer ingredientId) {
        return drinkService.getAllDrinks(pageable, ingredientId);
    }

    @GetMapping("/{id}")
    public DrinkDTO getDrinkById(@PathVariable Integer id) {
        return drinkService.getDrinkById(id);
    }

    @PostMapping
    public DrinkDTO createDrink(@Valid @RequestBody DrinkDTO request) {
        return drinkService.createDrink(request);
    }

    @PutMapping("/{id}")
    public DrinkDTO updateDrink(@PathVariable Integer id,
                               @Valid @RequestBody DrinkDTO request) {
        return drinkService.updateDrink(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteDrink(@PathVariable Integer id) {
        drinkService.deleteDrink(id);
    }
} 