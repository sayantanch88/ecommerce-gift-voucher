# API Documentation

## Voucher Redemption Endpoint
- `POST /api/voucher/redeem`
  - Request: `{ code: string, productId: number }`
  - Response: `{ success: boolean, message: string, discount?: number }`

## Product List Endpoint
- `GET /api/products`
  - Response: `[{ id, name, price, image }]`

## Error Handling
- Standardized error messages
- HTTP status codes
