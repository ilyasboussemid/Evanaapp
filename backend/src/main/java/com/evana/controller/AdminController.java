package com.evana.controller;

import com.evana.model.Admin;
import com.evana.model.Product;
import com.evana.repository.AdminRepository;
import com.evana.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;
    private final ProductRepository productRepository;

    public AdminController(AdminRepository adminRepository, ProductRepository productRepository) {
        this.adminRepository = adminRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        return adminRepository.findByUsername(username)
                .filter(admin -> admin.getPassword().equals(password))
                .map(admin -> ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Connexion réussie",
                        "username", admin.getUsername()
                )))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "Identifiants incorrects")));
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getSizes() != null) {
            product.getSizes().forEach(size -> size.setProduct(product));
        }
        if (product.getColors() != null) {
            product.getColors().forEach(color -> color.setProduct(product));
        }
        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(product.getName());
                    existing.setDescription(product.getDescription());
                    existing.setShortDescription(product.getShortDescription());
                    existing.setPrice(product.getPrice());
                    existing.setCategory(product.getCategory());
                    existing.setImageUrl(product.getImageUrl());
                    existing.setStock(product.getStock());
                    existing.setOnSale(product.getOnSale());
                    existing.setSalePrice(product.getSalePrice());
                    existing.setDiscountPercent(product.getDiscountPercent());

                    // Update sizes
                    existing.getSizes().clear();
                    if (product.getSizes() != null) {
                        product.getSizes().forEach(size -> {
                            size.setProduct(existing);
                            existing.getSizes().add(size);
                        });
                    }

                    // Update colors
                    existing.getColors().clear();
                    if (product.getColors() != null) {
                        product.getColors().forEach(color -> {
                            color.setProduct(existing);
                            existing.getColors().add(color);
                        });
                    }

                    return ResponseEntity.ok(productRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Produit supprimé"));
        }
        return ResponseEntity.notFound().build();
    }
}
