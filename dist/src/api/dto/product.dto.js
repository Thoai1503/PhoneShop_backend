"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDTO = exports.FilterStateDTO = exports.ProductVariantPaginatedDTO = exports.ProductAddAndUpdateStateDTO = exports.ProductDTO = exports.ProductVariantDTO = exports.VariantAttributeDTO = exports.ProductImageDTO = exports.ProductAttributeDTO = void 0;
class ProductAttributeDTO {
    id = 0;
    product_id = 0;
    attribute_id = 0;
    value_text = null;
    value_decimal = null;
    value_int = null;
    attribute_value_id = null;
    attribute = null;
}
exports.ProductAttributeDTO = ProductAttributeDTO;
class ProductImageDTO {
    id = 0;
    product_id = 0;
    variant_id = 0;
    url = null;
}
exports.ProductImageDTO = ProductImageDTO;
class VariantAttributeDTO {
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
exports.VariantAttributeDTO = VariantAttributeDTO;
class ProductVariantDTO {
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
exports.ProductVariantDTO = ProductVariantDTO;
class ProductDTO {
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
exports.ProductDTO = ProductDTO;
class ProductAddAndUpdateStateDTO {
    id = 0;
    name = '';
    description = '';
    category_id = 0;
    brand_id = 0;
    slug = '';
    rating = 0;
    status = 0;
}
exports.ProductAddAndUpdateStateDTO = ProductAddAndUpdateStateDTO;
class ProductVariantPaginatedDTO {
    data = [];
    count = 0;
    max = 0;
    min = 0;
}
exports.ProductVariantPaginatedDTO = ProductVariantPaginatedDTO;
class FilterStateDTO {
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
exports.FilterStateDTO = FilterStateDTO;
class CartDTO {
    id = 0;
    user_id = 0;
    variant_id = 0;
    quantity = 0;
    variant = null;
}
exports.CartDTO = CartDTO;
//# sourceMappingURL=product.dto.js.map