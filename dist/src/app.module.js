var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './infrastruture/database/prisma.module.js';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryController } from './api/controller/category.controller.js';
import { AttributeController } from './api/controller/attribute.controller.js';
import { AttributeValueController } from './api/controller/attribute-value.controller.js';
import { BrandController } from './api/controller/brand.controller.js';
import { CategoryAttributeController } from './api/controller/category-attribute.controller.js';
import { CategoryBrandController } from './api/controller/category-brand.controller.js';
import { ProductController } from './api/controller/product.controller.js';
import { ProductAttributeController } from './api/controller/product-attribute.controller.js';
import { ProductVariantController } from './api/controller/product-variant.controller.js';
import { VariantAttributeController } from './api/controller/variant-attribute.controller.js';
import { ProductImageController } from './api/controller/product-image.controller.js';
import { CartController } from './api/controller/cart.controller.js';
import { CategoryService } from './application/service/category.service.js';
import { AttributeService } from './application/service/attribute.service.js';
import { AttributeValueService } from './application/service/attribute-value.service.js';
import { BrandService } from './application/service/brand.service.js';
import { CategoryAttributeService } from './application/service/category-attribute.service.js';
import { CategoryBrandService } from './application/service/category-brand.service.js';
import { ProductService } from './application/service/product.service.js';
import { ProductAttributeService } from './application/service/product-attribute.service.js';
import { ProductVariantService } from './application/service/product-variant.service.js';
import { VariantAttributeService } from './application/service/variant-attribute.service.js';
import { ProductImageService } from './application/service/product-image.service.js';
import { CartService } from './application/service/cart.service.js';
import { CategoryRepository } from './infrastruture/repository/category.repository.js';
import { AttributeRepository } from './infrastruture/repository/attribute.repository.js';
import { AttributeValueRepository } from './infrastruture/repository/attribute-value.repository.js';
import { BrandRepository } from './infrastruture/repository/brand.repository.js';
import { CategoryAttributeRepository } from './infrastruture/repository/category-attribute.repository.js';
import { CategoryBrandRepository } from './infrastruture/repository/category-brand.repository.js';
import { ProductRepository } from './infrastruture/repository/product.repository.js';
import { ProductAttributeRepository } from './infrastruture/repository/product-attribute.repository.js';
import { ProductVariantRepository } from './infrastruture/repository/product-variant.repository.js';
import { VariantAttributeRepository } from './infrastruture/repository/variant-attribute.repository.js';
import { ProductImageRepository } from './infrastruture/repository/product-image.repository.js';
import { CartRepository } from './infrastruture/repository/cart.repository.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            MulterModule.register({}),
            ...(!isVercel
                ? [
                    ServeStaticModule.forRoot({
                        rootPath: join(process.cwd(), 'Uploads'),
                        serveRoot: '/Uploads',
                    }),
                ]
                : []),
        ],
        controllers: [
            AppController,
            CategoryController,
            AttributeController,
            AttributeValueController,
            BrandController,
            CategoryAttributeController,
            CategoryBrandController,
            ProductController,
            ProductAttributeController,
            ProductVariantController,
            VariantAttributeController,
            ProductImageController,
            CartController,
        ],
        providers: [
            AppService,
            CategoryService,
            AttributeService,
            AttributeValueService,
            BrandService,
            CategoryAttributeService,
            CategoryBrandService,
            ProductService,
            ProductAttributeService,
            ProductVariantService,
            VariantAttributeService,
            ProductImageService,
            CartService,
            CategoryRepository,
            AttributeRepository,
            AttributeValueRepository,
            BrandRepository,
            CategoryAttributeRepository,
            CategoryBrandRepository,
            ProductRepository,
            ProductAttributeRepository,
            ProductVariantRepository,
            VariantAttributeRepository,
            ProductImageRepository,
            CartRepository,
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map