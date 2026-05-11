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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, } from '@nestjs/common';
import { CartService } from '../../application/service/cart.service.js';
import { respondError, respondSuccess, } from '../../common/http/response.util.js';
let CartController = class CartController {
    service;
    constructor(service) {
        this.service = service;
    }
    async addToCart(req, body, res) {
        try {
            const cart = await this.service.create({
                user_id: body.user_id,
                variant_id: body.variant_id,
                quantity: body.quantity,
                unit_price: body.unit_price,
            });
            return respondSuccess(req, res, 201, cart, { message: 'Added to cart' });
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            return respondError(req, res, 500, { error: 'Failed to add item to cart' }, 'Failed to add item to cart');
        }
    }
    async findByUserId(req, userId, res) {
        const list = await this.service.findByUserId(userId);
        return respondSuccess(req, res, 200, list);
    }
    async updateQuantity(req, id, body, res) {
        try {
            const quantity = Number(body.quantity);
            let result = false;
            if (quantity === 0) {
                result = await this.service.deleteById(id);
            }
            else {
                result = await this.service.updateQuantity(id, quantity);
            }
            return respondSuccess(req, res, 200, { message: result }, {
                message: 'Quantity updated',
                data: result,
            });
        }
        catch (error) {
            console.error('Error updating cart item:', error);
            return respondError(req, res, 500, { error: 'Failed to retrieve cart items' }, 'Failed to retrieve cart items');
        }
    }
    async addListToCart(req, body, res) {
        try {
            const promiseArr = body.items.map((item) => this.service.create({
                user_id: body.user_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
            }));
            await Promise.all(promiseArr);
            return respondSuccess(req, res, 201, { message: 'Items added to cart' }, {
                message: 'Items added to cart',
                data: true,
            });
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            return respondError(req, res, 500, { error: 'Failed to add items to cart' }, 'Failed to add items to cart');
        }
    }
    async clearCart(req, userId, res) {
        try {
            const result = await this.service.deleteByUserId(userId);
            return respondSuccess(req, res, 200, { message: result }, {
                message: 'Cart cleared',
                data: result,
            });
        }
        catch (error) {
            console.error('Error clearing cart items:', error);
            return respondError(req, res, 500, { error: 'Failed to clear cart items' }, 'Failed to clear cart items');
        }
    }
};
__decorate([
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    Get('user/:userId'),
    __param(0, Req()),
    __param(1, Param('userId', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findByUserId", null);
__decorate([
    Post(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Body()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
__decorate([
    Post('list'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addListToCart", null);
__decorate([
    Delete('user/:userId'),
    __param(0, Req()),
    __param(1, Param('userId', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
CartController = __decorate([
    Controller('api/cart'),
    __metadata("design:paramtypes", [CartService])
], CartController);
export { CartController };
//# sourceMappingURL=cart.controller.js.map