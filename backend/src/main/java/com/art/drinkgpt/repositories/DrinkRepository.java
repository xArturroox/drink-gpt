package com.art.drinkgpt.repositories;

import com.art.drinkgpt.models.entities.Drink;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Integer> {
    @Query("SELECT DISTINCT d FROM Drink d JOIN d.drinkIngredients di WHERE di.ingredient.id = :ingredientId")
    Page<Drink> findByIngredientId(Integer ingredientId, Pageable pageable);
} 