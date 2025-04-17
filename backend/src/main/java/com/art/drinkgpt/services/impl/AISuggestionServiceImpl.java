package com.art.drinkgpt.services.impl;

import com.art.drinkgpt.models.dto.AISuggestionRequestDTO;
import com.art.drinkgpt.models.dto.SuggestedDrinkDTO;
import com.art.drinkgpt.services.AISuggestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AISuggestionServiceImpl implements AISuggestionService {

    private final ChatClient chatClient;
    private static final String PROMPT_TEMPLATE = """
            Based on the following preferences: {preferences}
            
            Suggest a drink recipe in the following format:
            Name: [drink name]
            Description: [short description]
            Ingredients: [list of ingredients with amounts]
            Recipe: [detailed preparation instructions]
            """;

    @Override
    public SuggestedDrinkDTO suggestDrink(AISuggestionRequestDTO request) {
        log.debug("Generating drink suggestion for preferences: {}", request.getPreferences());
        
        PromptTemplate template = new PromptTemplate(PROMPT_TEMPLATE);
        template.add("preferences", request.getPreferences());
        
        ChatResponse response = chatClient.call(template.create());
        String content = response.getResult().getOutput().getContent();
        
        return parseSuggestion(content);
    }

    private SuggestedDrinkDTO parseSuggestion(String content) {
        String[] lines = content.split("\n");
        String name = "";
        String description = "";
        String ingredients = "";
        String recipe = "";
        
        StringBuilder currentSection = new StringBuilder();
        String currentKey = "";
        
        for (String line : lines) {
            if (line.startsWith("Name:")) {
                name = line.substring(5).trim();
            } else if (line.startsWith("Description:")) {
                currentKey = "description";
                currentSection = new StringBuilder();
            } else if (line.startsWith("Ingredients:")) {
                if ("description".equals(currentKey)) {
                    description = currentSection.toString().trim();
                }
                currentKey = "ingredients";
                currentSection = new StringBuilder();
            } else if (line.startsWith("Recipe:")) {
                if ("ingredients".equals(currentKey)) {
                    ingredients = currentSection.toString().trim();
                }
                currentKey = "recipe";
                currentSection = new StringBuilder();
            } else if (!line.trim().isEmpty()) {
                currentSection.append(line.trim()).append("\n");
            }
        }
        
        if ("recipe".equals(currentKey)) {
            recipe = currentSection.toString().trim();
        }
        
        return new SuggestedDrinkDTO(name, description, ingredients, recipe);
    }
} 