package com.art.drinkgpt.models.dto;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private String drinkName;
    private String ingredients;
    private String recipe;
    private String guestName;
} 