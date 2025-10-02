package com.ecommerce.giftvoucher.service;

import com.ecommerce.giftvoucher.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface ProductService extends JpaRepository<Product, Long> {
}
