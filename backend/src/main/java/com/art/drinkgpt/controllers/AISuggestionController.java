package com.art.drinkgpt.controllers;

import com.art.drinkgpt.models.dto.AISuggestionRequestDTO;
import com.art.drinkgpt.models.dto.SuggestedDrinkDTO;
import com.art.drinkgpt.services.AISuggestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/suggestion")
@RequiredArgsConstructor
public class AISuggestionController {

    private final AISuggestionService aiSuggestionService;

    @PostMapping
    public SuggestedDrinkDTO suggestDrink(@Valid @RequestBody AISuggestionRequestDTO request) {
        return aiSuggestionService.suggestDrink(request);
    }
} 