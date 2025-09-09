<?php
namespace Controllers;

use Services\VoucherService;
use Services\ProductService;

class VoucherController {
    private $voucherService;
    private $productService;
    public function __construct() {
        $this->voucherService = new VoucherService();
        $this->productService = new ProductService();
    }
    public function redeem($code, $productId) {
        // You could add logic to check product validity, price, etc.
        return $this->voucherService->redeem($code, $productId);
    }
    public function getProducts() {
        return $this->productService->getProducts();
    }
}
