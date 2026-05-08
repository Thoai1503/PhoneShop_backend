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
exports.ProductVariantService = void 0;
const common_1 = require("@nestjs/common");
const product_variant_repository_1 = require("../../infrastruture/repository/product-variant.repository");
let ProductVariantService = class ProductVariantService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getPaginationData(st) {
        return this.repo.getPaginationData(st);
    }
    async findById(id) {
        return this.repo.findById(id);
    }
    async create(entity) {
        return this.repo.create(entity);
    }
    async update(entity) {
        return this.repo.update(entity);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
    async findByProductId(productId) {
        return this.repo.findByProductId(productId);
    }
};
exports.ProductVariantService = ProductVariantService;
exports.ProductVariantService = ProductVariantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_variant_repository_1.ProductVariantRepository])
], ProductVariantService);
//# sourceMappingURL=product-variant.service.js.map