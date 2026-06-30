package com.evana.service;

import com.evana.dto.OrderItemRequest;
import com.evana.dto.OrderRequest;
import com.evana.model.CustomerOrder;
import com.evana.model.OrderItem;
import com.evana.model.Product;
import com.evana.repository.OrderRepository;
import com.evana.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public CustomerOrder createOrder(OrderRequest request) {
        CustomerOrder order = new CustomerOrder();
        order.setFirstName(request.getFirstName());
        order.setLastName(request.getLastName());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());

        double total = 0.0;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produit introuvable : " + itemRequest.getProductId()));

            OrderItem orderItem = new OrderItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    itemRequest.getQuantity()
            );

            order.addItem(orderItem);
            total += orderItem.getSubtotal();
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public Optional<CustomerOrder> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
}
