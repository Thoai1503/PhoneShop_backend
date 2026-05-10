export class OrderUserDTO {
    id = 0;
    name = '';
    email = '';
    phone = '';
    status = 0;
}
export class OrderDTO {
    id = 0;
    user_id = 0;
    discount = 0;
    total = 0;
    address_id;
    status = 1;
    created_at;
    user = null;
}
//# sourceMappingURL=order.dto.js.map