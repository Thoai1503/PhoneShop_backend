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
exports.VariantAttributeController = void 0;
const common_1 = require("@nestjs/common");
const variant_attribute_service_1 = require("../../application/service/variant-attribute.service");
let VariantAttributeController = class VariantAttributeController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return this.service.getAll();
    }
    async updateFromList(list) {
        return this.service.updateFromList(list);
    }
};
exports.VariantAttributeController = VariantAttributeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VariantAttributeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('updatelist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VariantAttributeController.prototype, "updateFromList", null);
exports.VariantAttributeController = VariantAttributeController = __decorate([
    (0, common_1.Controller)('api/variantattribute'),
    __metadata("design:paramtypes", [variant_attribute_service_1.VariantAttributeService])
], VariantAttributeController);
//# sourceMappingURL=variant-attribute.controller.js.map