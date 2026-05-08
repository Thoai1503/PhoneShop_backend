export class Category {
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
//# sourceMappingURL=category.modal.js.map