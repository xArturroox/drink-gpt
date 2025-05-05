package com.art.drinkgpt.services.impl;

import com.art.drinkgpt.models.dto.OrderDTO;
import com.art.drinkgpt.models.dto.OrderRequestDTO;
import com.art.drinkgpt.models.entities.Order;
import com.art.drinkgpt.repositories.OrderRepository;
import com.art.drinkgpt.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Transactional(readOnly = true)
    @Override
    public Page<OrderDTO> getAllOrders(Pageable pageable, Boolean status) {
        return Objects.isNull(status) ? orderRepository.findAll(pageable).map(this::mapToDTO) : orderRepository.findAllByServed(pageable, status).map(this::mapToDTO);
    }

    @Override
    @Transactional
    public OrderDTO createOrder(OrderRequestDTO request) {
        log.debug("Creating new order: {}", request);
        Order order = new Order();
        order.setDrinkName(request.getDrinkName());
        order.setIngredients(request.getIngredients());
        order.setRecipe(request.getRecipe());
        order.setGuestName(request.getGuestName());
        order.setOrderTimestamp(Instant.now());
        order.setServed(false);

        return mapToDTO(orderRepository.save(order));
    }

    @Override
    @Transactional
    public void markOrderAsServed(Long orderId) {
        log.debug("Marking order as served: {}", orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));
        order.setServed(true);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        log.debug("Deleting order with id: {}", orderId);
        if (!orderRepository.existsById(orderId)) {
            throw new EntityNotFoundException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

    private OrderDTO mapToDTO(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getDrinkName(),
                order.getIngredients(),
                order.getRecipe(),
                order.getGuestName(),
                order.getOrderTimestamp(),
                order.isServed()
        );
    }
} 