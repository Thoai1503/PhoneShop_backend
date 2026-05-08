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
exports.VariantAttributeService = void 0;
const common_1 = require("@nestjs/common");
const variant_attribute_repository_1 = require("../../infrastruture/repository/variant-attribute.repository");
let VariantAttributeService = class VariantAttributeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.getAll();
    }
    async updateFromList(list) {
        return this.repo.updateFromList(list);
    }
};
exports.VariantAttributeService = VariantAttributeService;
exports.VariantAttributeService = VariantAttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [variant_attribute_repository_1.VariantAttributeRepository])
], VariantAttributeService);
//# sourceMappingURL=variant-attribute.service.js.map