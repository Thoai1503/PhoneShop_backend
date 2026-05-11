var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
export class ProductAttributeDTO {
    id = 0;
    product_id = 0;
    attribute_id = 0;
    value_text = null;
    value_decimal = null;
    value_int = null;
    attribute_value_id = null;
    attribute = null;
}
export class ProductImageDTO {
    id = 0;
    product_id = 0;
    variant_id = 0;
    url = null;
}
export class VariantAttributeDTO {
    id = 0;
    attribute_id = 0;
    variant_id = 0;
    value_int = null;
    value_text = null;
    value_decimal = null;
    attribute_value_id = null;
    attribute_value = null;
    attribute = null;
}
export class ProductVariantDTO {
    id = 0;
    product_id = 0;
    sku = '';
    name = '';
    price = 0;
    status = 0;
    created_at = null;
    product = null;
    product_images = null;
    variant_attributes = null;
}
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], ProductVariantDTO.prototype, "id", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], ProductVariantDTO.prototype, "product_id", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductVariantDTO.prototype, "sku", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductVariantDTO.prototype, "name", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductVariantDTO.prototype, "price", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], ProductVariantDTO.prototype, "status", void 0);
export class ProductDTO {
    id = 0;
    name = '';
    description = '';
    category_id = 0;
    brand_id = 0;
    slug = '';
    rating = 0;
    status = 0;
    created_at = null;
    category = null;
    brand = null;
    product_attribute = [];
    product_variant = [];
}
export class ProductAddAndUpdateStateDTO {
    id = 0;
    name = '';
    description = '';
    category_id = 0;
    brand_id = 0;
    slug = '';
    rating = 0;
    status = 0;
}
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductAddAndUpdateStateDTO.prototype, "id", void 0);
__decorate([
    Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], ProductAddAndUpdateStateDTO.prototype, "name", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductAddAndUpdateStateDTO.prototype, "description", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductAddAndUpdateStateDTO.prototype, "category_id", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductAddAndUpdateStateDTO.prototype, "brand_id", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductAddAndUpdateStateDTO.prototype, "slug", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductAddAndUpdateStateDTO.prototype, "rating", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], ProductAddAndUpdateStateDTO.prototype, "status", void 0);
export class ProductVariantPaginatedDTO {
    data = [];
    count = 0;
    max = 0;
    min = 0;
}
export class FilterStateDTO {
    skip = 0;
    take = 10;
    sortBy = 'created_at';
    order = 'asc';
    category = '';
    attributes = {};
    categoryIds = [];
    brandIds = [];
    minPrice = null;
    maxPrice = null;
}
export class CartDTO {
    id = 0;
    user_id = 0;
    variant_id = 0;
    quantity = 0;
    unit_price = null;
    variant = null;
}
//# sourceMappingURL=product.dto.js.map