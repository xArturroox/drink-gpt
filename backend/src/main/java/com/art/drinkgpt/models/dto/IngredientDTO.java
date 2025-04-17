package com.art.drinkgpt.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDTO {
    private Integer id;
    private String name;
    private Boolean available;
} 