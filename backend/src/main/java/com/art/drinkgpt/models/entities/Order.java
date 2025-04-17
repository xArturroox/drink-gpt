package com.art.drinkgpt.models.entities;

import lombok.*;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "drink_name", nullable = false, length = 255)
    private String drinkName;

    @Column(nullable = false, length = 1000)
    private String ingredients;

    @Column(nullable = false, length = 2000)
    private String recipe;

    @Column(name = "guest_name", nullable = false, length = 255)
    private String guestName;

    @Column(name = "order_timestamp", nullable = false)
    private Instant orderTimestamp;

    @Column(nullable = false)
    private boolean served;
}