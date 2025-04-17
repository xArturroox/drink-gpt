package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.AISuggestionRequestDTO;
import com.art.drinkgpt.models.dto.SuggestedDrinkDTO;

public interface AISuggestionService {
    SuggestedDrinkDTO suggestDrink(AISuggestionRequestDTO request);
} 