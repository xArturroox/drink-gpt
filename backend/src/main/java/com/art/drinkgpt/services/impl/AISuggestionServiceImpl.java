package com.art.drinkgpt.services.impl;

import com.art.drinkgpt.models.dto.AISuggestionRequestDTO;
import com.art.drinkgpt.models.dto.SuggestedDrinkDTO;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.AISuggestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.ResponseFormat;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AISuggestionServiceImpl implements AISuggestionService {

    private static final String PROMPT_TEMPLATE = """
            Na podstawie następujących preferencji zaproponuj jakiś drink: {preferences}
            
            Drink może użyć tylko następujących składników: {ingredients}
            
            Gdy nie znajdziesz pasującego drinku do preferencji to nie bierz powyższych zaleceń pod uwagę i zwróć przepis na Jagerbomb
            """;
    private static final String DRINK_JSON_SCHEMA = """
            {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "description": { "type": "string" },
                "ingredients": { "type": "string" },
                "recipe": { "type": "string" }
              },
              "required": ["name", "description", "ingredients", "recipe"]
            }
            """;
    private final ObjectMapper objectMapper;
    private final IngredientRepository ingredientRepository;
    private final OpenAiChatModel chatClient;

    @Override
    public SuggestedDrinkDTO suggestDrink(AISuggestionRequestDTO request) {
        log.debug("Generating drink suggestion for preferences: {}", request.getPreferences());
        List<String> availableDrinks = ingredientRepository.findByAvailable(true).stream()
                .map(Ingredient::getName)
                .toList();

        PromptTemplate template = new PromptTemplate(PROMPT_TEMPLATE);
        template.add("preferences", request.getPreferences());
        template.add("ingredients", availableDrinks);
        Prompt prompt = template.create(OpenAiChatOptions.builder()
                .responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, DRINK_JSON_SCHEMA))
                .build());

        ChatResponse response = chatClient.call(prompt);

        try {
            return objectMapper.readValue(response.getResult().getOutput().getText(), SuggestedDrinkDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }
} 