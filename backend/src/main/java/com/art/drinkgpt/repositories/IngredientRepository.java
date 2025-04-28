package com.art.drinkgpt.repositories;

import com.art.drinkgpt.models.entities.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Page<Ingredient> findByAvailable(boolean available, Pageable pageable);

    Set<Ingredient> findByAvailable(boolean available);
}