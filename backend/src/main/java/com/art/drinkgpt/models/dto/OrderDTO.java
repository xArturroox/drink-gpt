package com.art.drinkgpt.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class OrderDTO {
    private Integer id;
    private String drinkName;
    private String ingredients;
    private String recipe;
    private String guestName;
    private Instant orderTimestamp;
    private boolean served;
} 