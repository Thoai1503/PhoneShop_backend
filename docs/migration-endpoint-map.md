# Endpoint Mapping (Test Vercel ts -> PhoneShop)

## Brand

- GET /api/brand -> GET /api/brand
- POST /api/brand -> POST /api/brand

## Category

- GET /api/category -> GET /api/category
- GET /api/category/:id -> GET /api/category/:id
- POST /api/category -> POST /api/category
- POST /api/category/:id -> POST /api/category/:id
- DELETE /api/category/:id -> DELETE /api/category/:id

## Cart

- POST /api/cart -> POST /api/cart
- GET /api/cart/user/:user_id -> GET /api/cart/user/:userId
- POST /api/cart/:id -> POST /api/cart/:id
- POST /api/cart/list -> POST /api/cart/list
- DELETE /api/cart/user/:user_id -> DELETE /api/cart/user/:userId

## Auth

- POST /api/v1/auth/login -> POST /api/v1/auth/login
- POST /api/v1/auth/register -> POST /api/v1/auth/register
- POST /api/v1/auth/refresh_token -> POST /api/v1/auth/refresh_token

## Province

- GET /api/province -> GET /api/province

## District

- GET /api/district/province/:province_id -> GET /api/district/province/:province_id

## Ward

- GET /api/ward/district/:district_id -> GET /api/ward/district/:district_id

## User Address

- POST /api/user-address -> POST /api/user-address
- GET /api/user-address/user/:user_id -> GET /api/user-address/user/:user_id
- PUT /api/user-address/:id -> PUT /api/user-address/:id

## Order

- GET /api/order?page=1&search=... -> GET /api/order?page=1&search=...
- GET /api/order/user/:user_id -> GET /api/order/user/:user_id
- GET /api/order/:id -> GET /api/order/:id

## Order Detail

- GET /api/order-detail/order/:order_id -> GET /api/order-detail/order/:order_id

## Response Contract Notes

- Category create/update responses preserved to match source success/message/data structure.
- Cart responses preserved for add, update quantity, list add, and clear cart.
- Auth login/register/refresh error-response shape preserved with success/message/code fields.
- User-address create returns numeric status (1/0) like source.
- Order list preserves paging response shape: { list, page, totalPages }.
- Optional unified response envelope is enabled by header/query:
  - Header: x-response-format=standard (or unified / v2)
  - Query: ?responseFormat=standard
- Postman collection for all migrated endpoints:
  - postman/phoneshop-migrated.postman_collection.json
