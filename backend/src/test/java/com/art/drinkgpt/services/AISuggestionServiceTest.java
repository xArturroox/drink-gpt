package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.AISuggestionRequestDTO;
import com.art.drinkgpt.models.dto.SuggestedDrinkDTO;
import com.art.drinkgpt.models.entities.Ingredient;
import com.art.drinkgpt.repositories.IngredientRepository;
import com.art.drinkgpt.services.impl.AISuggestionServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AISuggestionServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @Mock
    private OpenAiChatModel chatClient;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private AISuggestionServiceImpl aiSuggestionService;

    private AISuggestionRequestDTO requestDTO;
    private Set<Ingredient> availableIngredients;
    private String jsonResponse;

    @BeforeEach
    void setUp() {
        requestDTO = new AISuggestionRequestDTO();
        requestDTO.setPreferences("sweet and fruity");

        Ingredient vodka = new Ingredient();
        vodka.setId(1);
        vodka.setName("Vodka");
        vodka.setAvailable(true);

        Ingredient orange = new Ingredient();
        orange.setId(2);
        orange.setName("Orange Juice");
        orange.setAvailable(true);

        availableIngredients = Set.of(vodka, orange);

        jsonResponse = "{\"name\":\"Screwdriver\",\"description\":\"A simple, refreshing cocktail\",\"ingredients\":\"50ml Vodka, 100ml Orange Juice\",\"recipe\":\"Pour vodka over ice in a highball glass. Fill with orange juice and stir.\"}";
    }

    @Test
    void suggestDrink_ShouldReturnSuggestedDrinkDTO() throws Exception {
        // Given
        when(ingredientRepository.findByAvailable(true)).thenReturn(availableIngredients);

        // Mocki dla Spring AI
        ChatResponse chatResponse = mock(ChatResponse.class);
        Generation generation = mock(Generation.class);
        AssistantMessage assistantMessage = mock(AssistantMessage.class);

        // Poprawny łańcuch mockowania
        when(chatClient.call(any(Prompt.class))).thenReturn(chatResponse);
        when(chatResponse.getResult()).thenReturn(generation);
        when(generation.getOutput()).thenReturn(assistantMessage);
        when(assistantMessage.getText()).thenReturn(jsonResponse);

        // Mock dla odpowiedzi DTO
        SuggestedDrinkDTO expectedDrink = mock(SuggestedDrinkDTO.class);
        when(expectedDrink.getName()).thenReturn("Screwdriver");
        when(expectedDrink.getDescription()).thenReturn("A simple, refreshing cocktail");

        when(objectMapper.readValue(eq(jsonResponse), eq(SuggestedDrinkDTO.class))).thenReturn(expectedDrink);

        // When
        SuggestedDrinkDTO result = aiSuggestionService.suggestDrink(requestDTO);

        // Then
        assertNotNull(result);
        assertEquals("Screwdriver", result.getName());
        assertEquals("A simple, refreshing cocktail", result.getDescription());
        verify(ingredientRepository).findByAvailable(true);
        verify(chatClient).call(any(Prompt.class));
        verify(objectMapper).readValue(eq(jsonResponse), eq(SuggestedDrinkDTO.class));
    }

    @Test
    void suggestDrink_WhenJsonParsingFails_ShouldThrowRuntimeException() throws Exception {
        // Given
        when(ingredientRepository.findByAvailable(true)).thenReturn(availableIngredients);

        // Mocki dla Spring AI
        ChatResponse chatResponse = mock(ChatResponse.class);
        Generation generation = mock(Generation.class);
        AssistantMessage assistantMessage = mock(AssistantMessage.class);
        String invalidJson = "{invalid json}";

        // Poprawny łańcuch mockowania
        when(chatClient.call(any(Prompt.class))).thenReturn(chatResponse);
        when(chatResponse.getResult()).thenReturn(generation);
        when(generation.getOutput()).thenReturn(assistantMessage);
        when(assistantMessage.getText()).thenReturn(invalidJson);

        when(objectMapper.readValue(eq(invalidJson), eq(SuggestedDrinkDTO.class)))
                .thenThrow(new RuntimeException("JSON parsing error"));

        // When/Then
        assertThrows(RuntimeException.class, () -> aiSuggestionService.suggestDrink(requestDTO));
        verify(ingredientRepository).findByAvailable(true);
        verify(chatClient).call(any(Prompt.class));
    }
} 