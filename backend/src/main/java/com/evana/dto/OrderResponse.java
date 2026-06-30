package com.evana.dto;

import com.evana.model.CustomerOrder;
import com.evana.model.OrderItem;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private Double totalAmount;
    private LocalDateTime orderDate;
    private String status;
    private List<OrderItemResponse> items;

    public OrderResponse(CustomerOrder order) {
        this.id = order.getId();
        this.firstName = order.getFirstName();
        this.lastName = order.getLastName();
        this.phone = order.getPhone();
        this.address = order.getAddress();
        this.totalAmount = order.getTotalAmount();
        this.orderDate = order.getOrderDate();
        this.status = order.getStatus();
        this.items = order.getItems().stream().map(OrderItemResponse::new).toList();
    }

    // Getters
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public Double getTotalAmount() { return totalAmount; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public String getStatus() { return status; }
    public List<OrderItemResponse> getItems() { return items; }

    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Double unitPrice;
        private Integer quantity;
        private Double subtotal;

        public OrderItemResponse(OrderItem item) {
            this.productId = item.getProductId();
            this.productName = item.getProductName();
            this.unitPrice = item.getUnitPrice();
            this.quantity = item.getQuantity();
            this.subtotal = item.getSubtotal();
        }

        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public Double getUnitPrice() { return unitPrice; }
        public Integer getQuantity() { return quantity; }
        public Double getSubtotal() { return subtotal; }
    }
}
