package com.ecommerce.giftvoucher.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    @Column(name = "amount")
    private BigDecimal amount;
    private boolean redeemed;
}
