"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Brand {
    id;
    name;
    slug;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(brand) {
        this.name = brand.name;
        this.slug = brand.slug;
    }
}
exports.default = Brand;
//# sourceMappingURL=brand.modal.js.map