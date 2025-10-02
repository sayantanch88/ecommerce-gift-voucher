package com.ecommerce.giftvoucher.controller;

import com.ecommerce.giftvoucher.model.Voucher;
import com.ecommerce.giftvoucher.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voucher")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/{code}")
    public Voucher getVoucher(@PathVariable String code) {
        return voucherService.findByCode(code);
    }

    @PostMapping("/redeem/{code}")
    public Voucher redeemVoucher(@PathVariable String code) {
        Voucher voucher = voucherService.findByCode(code);
        if (voucher != null && !voucher.isRedeemed()) {
            voucher.setRedeemed(true);
            return voucherService.save(voucher);
        }
        return null;
    }
}
