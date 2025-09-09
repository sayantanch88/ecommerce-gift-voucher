<?php
namespace Services;

use Models\Product;

class ProductService {
    public function getProducts() {
        return [
            new Product(1, 'Coco Republic Milo Sofa', 1200, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80'),
            new Product(2, 'Coco Republic Kennedy Coffee Table', 450, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'),
            new Product(3, 'Coco Republic Acapulco Armchair', 700, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'),
        ];
    }
}
