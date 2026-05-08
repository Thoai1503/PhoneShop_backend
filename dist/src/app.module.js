"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./infrastruture/database/prisma.module");
const platform_express_1 = require("@nestjs/platform-express");
const category_controller_1 = require("./api/controller/category.controller");
const attribute_controller_1 = require("./api/controller/attribute.controller");
const attribute_value_controller_1 = require("./api/controller/attribute-value.controller");
const brand_controller_1 = require("./api/controller/brand.controller");
const category_attribute_controller_1 = require("./api/controller/category-attribute.controller");
const category_brand_controller_1 = require("./api/controller/category-brand.controller");
const product_controller_1 = require("./api/controller/product.controller");
const product_attribute_controller_1 = require("./api/controller/product-attribute.controller");
const product_variant_controller_1 = require("./api/controller/product-variant.controller");
const variant_attribute_controller_1 = require("./api/controller/variant-attribute.controller");
const product_image_controller_1 = require("./api/controller/product-image.controller");
const cart_controller_1 = require("./api/controller/cart.controller");
const category_service_1 = require("./application/service/category.service");
const attribute_service_1 = require("./application/service/attribute.service");
const attribute_value_service_1 = require("./application/service/attribute-value.service");
const brand_service_1 = require("./application/service/brand.service");
const category_attribute_service_1 = require("./application/service/category-attribute.service");
const category_brand_service_1 = require("./application/service/category-brand.service");
const product_service_1 = require("./application/service/product.service");
const product_attribute_service_1 = require("./application/service/product-attribute.service");
const product_variant_service_1 = require("./application/service/product-variant.service");
const variant_attribute_service_1 = require("./application/service/variant-attribute.service");
const product_image_service_1 = require("./application/service/product-image.service");
const cart_service_1 = require("./application/service/cart.service");
const category_repository_1 = require("./infrastruture/repository/category.repository");
const attribute_repository_1 = require("./infrastruture/repository/attribute.repository");
const attribute_value_repository_1 = require("./infrastruture/repository/attribute-value.repository");
const brand_repository_1 = require("./infrastruture/repository/brand.repository");
const category_attribute_repository_1 = require("./infrastruture/repository/category-attribute.repository");
const category_brand_repository_1 = require("./infrastruture/repository/category-brand.repository");
const product_repository_1 = require("./infrastruture/repository/product.repository");
const product_attribute_repository_1 = require("./infrastruture/repository/product-attribute.repository");
const product_variant_repository_1 = require("./infrastruture/repository/product-variant.repository");
const variant_attribute_repository_1 = require("./infrastruture/repository/variant-attribute.repository");
const product_image_repository_1 = require("./infrastruture/repository/product-image.repository");
const cart_repository_1 = require("./infrastruture/repository/cart.repository");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            platform_express_1.MulterModule.register({}),
            ...(!isVercel
                ? [
                    serve_static_1.ServeStaticModule.forRoot({
                        rootPath: (0, path_1.join)(process.cwd(), 'Uploads'),
                        serveRoot: '/Uploads',
                    }),
                ]
                : []),
        ],
        controllers: [
            app_controller_1.AppController,
            category_controller_1.CategoryController,
            attribute_controller_1.AttributeController,
            attribute_value_controller_1.AttributeValueController,
            brand_controller_1.BrandController,
            category_attribute_controller_1.CategoryAttributeController,
            category_brand_controller_1.CategoryBrandController,
            product_controller_1.ProductController,
            product_attribute_controller_1.ProductAttributeController,
            product_variant_controller_1.ProductVariantController,
            variant_attribute_controller_1.VariantAttributeController,
            product_image_controller_1.ProductImageController,
            cart_controller_1.CartController,
        ],
        providers: [
            app_service_1.AppService,
            category_service_1.CategoryService,
            attribute_service_1.AttributeService,
            attribute_value_service_1.AttributeValueService,
            brand_service_1.BrandService,
            category_attribute_service_1.CategoryAttributeService,
            category_brand_service_1.CategoryBrandService,
            product_service_1.ProductService,
            product_attribute_service_1.ProductAttributeService,
            product_variant_service_1.ProductVariantService,
            variant_attribute_service_1.VariantAttributeService,
            product_image_service_1.ProductImageService,
            cart_service_1.CartService,
            category_repository_1.CategoryRepository,
            attribute_repository_1.AttributeRepository,
            attribute_value_repository_1.AttributeValueRepository,
            brand_repository_1.BrandRepository,
            category_attribute_repository_1.CategoryAttributeRepository,
            category_brand_repository_1.CategoryBrandRepository,
            product_repository_1.ProductRepository,
            product_attribute_repository_1.ProductAttributeRepository,
            product_variant_repository_1.ProductVariantRepository,
            variant_attribute_repository_1.VariantAttributeRepository,
            product_image_repository_1.ProductImageRepository,
            cart_repository_1.CartRepository,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map