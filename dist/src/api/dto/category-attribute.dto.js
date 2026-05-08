"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAttributeUpdateStateDTO = exports.CategoryAttributeDTO = void 0;
class CategoryAttributeDTO {
    id = 0;
    category_id = 0;
    attribute_id = 0;
    is_filterable = false;
    is_variant_level = false;
    is_required = false;
    category = null;
    attribute = null;
}
exports.CategoryAttributeDTO = CategoryAttributeDTO;
class CategoryAttributeUpdateStateDTO {
    id = 0;
    category_id = 0;
    attribute_id = 0;
    is_filterable = false;
    is_variant_level = false;
    is_required = false;
}
exports.CategoryAttributeUpdateStateDTO = CategoryAttributeUpdateStateDTO;
//# sourceMappingURL=category-attribute.dto.js.map