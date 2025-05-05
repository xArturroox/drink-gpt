package com.art.drinkgpt.services;

import com.art.drinkgpt.models.dto.OrderDTO;
import com.art.drinkgpt.models.dto.OrderRequestDTO;
import com.art.drinkgpt.models.entities.Order;
import com.art.drinkgpt.repositories.OrderRepository;
import com.art.drinkgpt.services.impl.OrderServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private Order order;
    private OrderRequestDTO requestDTO;
    private Pageable pageable;
    private Instant orderTime;

    @BeforeEach
    void setUp() {
        orderTime = Instant.now();
        pageable = PageRequest.of(0, 10);

        // Setup Order
        order = new Order();
        order.setId(1);
        order.setDrinkName("Martini");
        order.setIngredients("Gin, Vermouth");
        order.setRecipe("Stir with ice and strain into a chilled glass");
        order.setGuestName("John Doe");
        order.setOrderTimestamp(orderTime);
        order.setServed(false);

        // Setup OrderRequestDTO
        requestDTO = new OrderRequestDTO();
        requestDTO.setDrinkName("Martini");
        requestDTO.setIngredients("Gin, Vermouth");
        requestDTO.setRecipe("Stir with ice and strain into a chilled glass");
        requestDTO.setGuestName("John Doe");
    }

    @Test
    void getAllOrders_ShouldReturnPageOfOrderDTOs() {
        // Given
        Page<Order> orderPage = new PageImpl<>(List.of(order));
        when(orderRepository.findAll(pageable)).thenReturn(orderPage);

        // When
        Page<OrderDTO> result = orderService.getAllOrders(pageable, null);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Martini", result.getContent().get(0).getDrinkName());
        assertEquals("John Doe", result.getContent().get(0).getGuestName());
        assertFalse(result.getContent().get(0).isServed());
        verify(orderRepository).findAll(pageable);
    }

    @Test
    void createOrder_ShouldReturnCreatedOrderDTO() {
        // Given
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        // When
        OrderDTO result = orderService.createOrder(requestDTO);

        // Then
        assertNotNull(result);
        assertEquals("Martini", result.getDrinkName());
        assertEquals("John Doe", result.getGuestName());
        assertEquals("Gin, Vermouth", result.getIngredients());
        assertEquals("Stir with ice and strain into a chilled glass", result.getRecipe());
        assertFalse(result.isServed());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void markOrderAsServed_WhenExists_ShouldMarkAsServed() {
        // Given
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        // When
        orderService.markOrderAsServed(1L);

        // Then
        verify(orderRepository).findById(1L);
        verify(orderRepository).save(order);
        assertTrue(order.isServed());
    }

    @Test
    void markOrderAsServed_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(orderRepository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> orderService.markOrderAsServed(1L));
    }

    @Test
    void deleteOrder_WhenExists_ShouldDeleteSuccessfully() {
        // Given
        when(orderRepository.existsById(1L)).thenReturn(true);
        doNothing().when(orderRepository).deleteById(1L);

        // When
        orderService.deleteOrder(1L);

        // Then
        verify(orderRepository).existsById(1L);
        verify(orderRepository).deleteById(1L);
    }

    @Test
    void deleteOrder_WhenNotExists_ShouldThrowEntityNotFoundException() {
        // Given
        when(orderRepository.existsById(1L)).thenReturn(false);

        // When/Then
        assertThrows(EntityNotFoundException.class, () -> orderService.deleteOrder(1L));
    }
} 