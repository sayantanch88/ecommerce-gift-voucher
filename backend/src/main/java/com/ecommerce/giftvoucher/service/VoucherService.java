package com.ecommerce.giftvoucher.service;

import com.ecommerce.giftvoucher.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface VoucherService extends JpaRepository<Voucher, Long> {
    Voucher findByCode(String code);
}
