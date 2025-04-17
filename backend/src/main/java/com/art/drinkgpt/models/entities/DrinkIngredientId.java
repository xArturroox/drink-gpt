package com.art.drinkgpt.models.entities;

import lombok.*;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkIngredientId implements Serializable {
    private Integer drinkId;
    private Integer ingredientId;
}