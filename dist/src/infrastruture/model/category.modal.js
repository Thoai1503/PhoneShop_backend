"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    id;
    name;
    slug;
    parentId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(category) {
        this.name = category.name;
        this.slug = category.slug;
        this.parentId = category.parentId;
    }
}
exports.Category = Category;
//# sourceMappingURL=category.modal.js.map