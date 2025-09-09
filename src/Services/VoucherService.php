<?php
namespace Services;

use Models\Voucher;

class VoucherService {
    private $vouchers = [];
    public function __construct() {
        // Simulate voucher storage
        $this->vouchers = [
            'ABC123' => new Voucher('ABC123'),
            'XYZ789' => new Voucher('XYZ789'),
        ];
    }
    public function redeem($code, $productId) {
        $discount = 100; // Fixed discount for demo
        if (isset($this->vouchers[$code]) && !$this->vouchers[$code]->redeemed) {
            $this->vouchers[$code]->redeemed = true;
            // Return discount info
            return [
                'success' => true,
                'message' => 'Voucher redeemed successfully!',
                'discount' => $discount,
                'productId' => $productId
            ];
        }
        return [
            'success' => false,
            'message' => 'Invalid or already redeemed voucher code.'
        ];
    }
}
