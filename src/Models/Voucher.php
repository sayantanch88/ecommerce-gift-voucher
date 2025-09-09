<?php
namespace Models;

class Voucher {
    public $code;
    public $redeemed;
    public function __construct($code, $redeemed = false) {
        $this->code = $code;
        $this->redeemed = $redeemed;
    }
}
