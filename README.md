# Gift Voucher Redemption App for BigCommerce

A simple PHP app for redeeming gift vouchers, ready for integration with BigCommerce storefronts and independently executable via Docker.

## Features
- Voucher redemption UI
- PHP backend logic
- Ready for BigCommerce API integration
- Docker/Docker Compose support

## Running Locally
1. Install Docker & Docker Compose
2. Run:
   ```
   docker-compose up --build
   ```
3. Access at [http://localhost:8080](http://localhost:8080)

## Integration with BigCommerce
- Replace the voucher logic in `src/VoucherService.php` with BigCommerce API calls.
- Embed the UI in your BigCommerce storefront using an iframe or custom app integration.

## Customization
- Update UI in `public/index.php` and `public/style.css`
- Extend backend logic in `src/VoucherService.php`
