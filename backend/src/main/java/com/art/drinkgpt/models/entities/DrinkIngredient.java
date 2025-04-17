package com.art.drinkgpt.models.entities;

import lombok.*;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "drink_ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkIngredient {

    @EmbeddedId
    private DrinkIngredientId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("drinkId")
    @JoinColumn(name = "drink_id", nullable = false)
    private Drink drink;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    @Column(nullable = false)
    private Float quantity;

    @Column(nullable = false, length = 50)
    private String unit;
}