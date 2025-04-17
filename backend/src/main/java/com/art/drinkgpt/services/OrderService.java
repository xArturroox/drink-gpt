package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.OrderDTO;
import com.art.drinkgpt.models.dto.OrderRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<OrderDTO> getAllOrders(Pageable pageable);
    OrderDTO createOrder(OrderRequestDTO request);
    void markOrderAsServed(Long orderId);
    void deleteOrder(Long orderId);
} 