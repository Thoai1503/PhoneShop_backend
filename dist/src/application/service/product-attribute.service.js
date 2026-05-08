"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeService = void 0;
const common_1 = require("@nestjs/common");
const product_attribute_repository_1 = require("../../infrastruture/repository/product-attribute.repository");
let ProductAttributeService = class ProductAttributeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async update(id, entity) {
        const existing = await this.repo.findById(id);
        if (!existing)
            return false;
        return this.repo.update(id, entity);
    }
};
exports.ProductAttributeService = ProductAttributeService;
exports.ProductAttributeService = ProductAttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_attribute_repository_1.ProductAttributeRepository])
], ProductAttributeService);
//# sourceMappingURL=product-attribute.service.js.map