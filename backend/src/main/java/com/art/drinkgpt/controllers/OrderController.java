package com.art.drinkgpt.controllers;

import com.art.drinkgpt.models.dto.OrderDTO;
import com.art.drinkgpt.models.dto.OrderRequestDTO;
import com.art.drinkgpt.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        return orderService.getAllOrders(pageable);
    }

    @PostMapping
    public OrderDTO createOrder(@Valid @RequestBody OrderRequestDTO request) {
        return orderService.createOrder(request);
    }

    @PatchMapping("/{orderId}/served")
    public void markOrderAsServed(@PathVariable Long orderId) {
        orderService.markOrderAsServed(orderId);
    }

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
    }
} 