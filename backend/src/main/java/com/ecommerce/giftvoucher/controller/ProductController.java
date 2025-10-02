package com.ecommerce.giftvoucher.controller;

import com.ecommerce.giftvoucher.model.Product;
import com.ecommerce.giftvoucher.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }
}
