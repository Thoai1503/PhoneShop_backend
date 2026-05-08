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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantController = void 0;
const common_1 = require("@nestjs/common");
const product_variant_service_1 = require("../../application/service/product-variant.service");
const product_dto_1 = require("../dto/product.dto");
let ProductVariantController = class ProductVariantController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll(query) {
        const st = this.parseFilterState(query);
        return this.service.getPaginationData(st);
    }
    async getById(id) {
        const result = await this.service.findById(id);
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async create(entity) {
        return this.service.create(entity);
    }
    async updateVariant(entity) {
        const result = await this.service.update(entity);
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async delete(id) {
        return this.service.delete(id);
    }
    async findByProductId(productId) {
        return this.service.findByProductId(productId);
    }
    parseFilterState(query) {
        const st = new product_dto_1.FilterStateDTO();
        if (query['skip'])
            st.skip = parseInt(query['skip'], 10) || 0;
        if (query['take'])
            st.take = parseInt(query['take'], 10) || 10;
        if (query['sortBy'])
            st.sortBy = query['sortBy'];
        if (query['order'])
            st.order = query['order'];
        if (query['category'])
            st.category = query['category'];
        if (query['minPrice'])
            st.minPrice = parseFloat(query['minPrice']) || null;
        if (query['maxPrice'])
            st.maxPrice = parseFloat(query['maxPrice']) || null;
        if (query['categoryIds']) {
            const raw = Array.isArray(query['categoryIds'])
                ? query['categoryIds'].join(',')
                : query['categoryIds'];
            st.categoryIds = raw
                .split(',')
                .map((x) => parseInt(x.trim(), 10))
                .filter((x) => !isNaN(x) && x > 0);
        }
        for (const [key, value] of Object.entries(query)) {
            if (key.startsWith('attributes.')) {
                const attrKey = key.replace('attributes.', '');
                const raw = Array.isArray(value) ? value.join(',') : String(value);
                st.attributes[attrKey] = raw
                    .split(',')
                    .map((v) => v.trim())
                    .filter((v) => v.length > 0);
            }
        }
        return st;
    }
};
exports.ProductVariantController = ProductVariantController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductVariantDTO]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('Update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductVariantDTO]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "updateVariant", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "findByProductId", null);
exports.ProductVariantController = ProductVariantController = __decorate([
    (0, common_1.Controller)('api/productvariant'),
    __metadata("design:paramtypes", [product_variant_service_1.ProductVariantService])
], ProductVariantController);
//# sourceMappingURL=product-variant.controller.js.map