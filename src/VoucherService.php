<?php
class VoucherService {
    // Simulate voucher storage. Replace with DB or BigCommerce API integration.
    private $vouchers = [
        'ABC123' => true,
        'XYZ789' => true,
    ];

    public function redeem($code) {
        if (isset($this->vouchers[$code]) && $this->vouchers[$code]) {
            // Mark as redeemed (simulate)
            $this->vouchers[$code] = false;
            // TODO: Integrate with BigCommerce API to apply voucher
            return [
                'success' => true,
                'message' => 'Voucher redeemed successfully!'
            ];
        }
        return [
            'success' => false,
            'message' => 'Invalid or already redeemed voucher code.'
        ];
    }
}
