package com.evana.service;

import com.evana.model.Product;
import com.evana.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> searchProducts(String search, String category) {
        if (category != null && !category.isBlank() && search != null && !search.isBlank()) {
            return productRepository.searchByCategoryAndName(category, search);
        } else if (category != null && !category.isBlank()) {
            return productRepository.findByCategory(category);
        } else if (search != null && !search.isBlank()) {
            return productRepository.searchByNameOrDescription(search);
        }
        return productRepository.findAll();
    }

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }
}
