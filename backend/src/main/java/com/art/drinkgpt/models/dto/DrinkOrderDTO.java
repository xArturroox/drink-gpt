package com.art.drinkgpt.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkOrderDTO {
    private Integer id;
    private String drinkName;
    private String ingredients;
    private String recipe;
    private String guestName;
    private Instant orderTimestamp;
    private boolean served;
} 