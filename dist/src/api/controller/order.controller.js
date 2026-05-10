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
import { Controller, Get, Param, ParseIntPipe, Query, Req, Res, } from '@nestjs/common';
import { OrderService } from '../../application/service/order.service.js';
import { respondSuccess } from '../../common/http/response.util.js';
let OrderController = class OrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAllOrder(req, pageQuery, searchQuery, res) {
        const searchStr = typeof searchQuery === 'string' ? searchQuery.trim() : '';
        const page = Number(pageQuery) || 1;
        const limit = 8;
        const start = (page - 1) * limit;
        const end = start + limit;
        let list = await this.service.findAll();
        if (searchStr !== '') {
            list = list.filter((item) => {
                const phone = (item.user?.phone || '').trim();
                return phone.includes(searchStr);
            });
        }
        const count = list.length;
        const totalPages = Math.ceil(count / limit);
        list = list.slice(start, end);
        return respondSuccess(req, res, 200, { list, page, totalPages }, {
            message: 'Orders fetched',
            data: { list, page, totalPages },
            meta: { page, totalPages, count },
        });
    }
    async getByUserId(req, userId, res) {
        const list = await this.service.getByUserId(userId);
        return respondSuccess(req, res, 200, list);
    }
    async getById(req, id, res) {
        const order = await this.service.findById(id);
        return respondSuccess(req, res, 200, order);
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __param(1, Query('page')),
    __param(2, Query('search')),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrder", null);
__decorate([
    Get('user/:user_id'),
    __param(0, Req()),
    __param(1, Param('user_id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getByUserId", null);
__decorate([
    Get(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getById", null);
OrderController = __decorate([
    Controller('api/v1/order'),
    __metadata("design:paramtypes", [OrderService])
], OrderController);
export { OrderController };
//# sourceMappingURL=order.controller.js.map