package com.art.drinkgpt.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
    @EqualsAndHashCode.Exclude
    @JoinColumn(name = "drink_id", nullable = false)
    private Drink drink;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    @EqualsAndHashCode.Exclude
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    @Column(nullable = false)
    private Float quantity;

    @Column(nullable = false, length = 50)
    private String unit;
}