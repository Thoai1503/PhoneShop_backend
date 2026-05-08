import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastruture/database/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

// Controllers
import { CategoryController } from './api/controller/category.controller';
import { AttributeController } from './api/controller/attribute.controller';
import { AttributeValueController } from './api/controller/attribute-value.controller';
import { BrandController } from './api/controller/brand.controller';
import { CategoryAttributeController } from './api/controller/category-attribute.controller';
import { CategoryBrandController } from './api/controller/category-brand.controller';
import { ProductController } from './api/controller/product.controller';
import { ProductAttributeController } from './api/controller/product-attribute.controller';
import { ProductVariantController } from './api/controller/product-variant.controller';
import { VariantAttributeController } from './api/controller/variant-attribute.controller';
import { ProductImageController } from './api/controller/product-image.controller';
import { CartController } from './api/controller/cart.controller';

// Services
import { CategoryService } from './application/service/category.service';
import { AttributeService } from './application/service/attribute.service';
import { AttributeValueService } from './application/service/attribute-value.service';
import { BrandService } from './application/service/brand.service';
import { CategoryAttributeService } from './application/service/category-attribute.service';
import { CategoryBrandService } from './application/service/category-brand.service';
import { ProductService } from './application/service/product.service';
import { ProductAttributeService } from './application/service/product-attribute.service';
import { ProductVariantService } from './application/service/product-variant.service';
import { VariantAttributeService } from './application/service/variant-attribute.service';
import { ProductImageService } from './application/service/product-image.service';
import { CartService } from './application/service/cart.service';

// Repositories
import { CategoryRepository } from './infrastruture/repository/category.repository';
import { AttributeRepository } from './infrastruture/repository/attribute.repository';
import { AttributeValueRepository } from './infrastruture/repository/attribute-value.repository';
import { BrandRepository } from './infrastruture/repository/brand.repository';
import { CategoryAttributeRepository } from './infrastruture/repository/category-attribute.repository';
import { CategoryBrandRepository } from './infrastruture/repository/category-brand.repository';
import { ProductRepository } from './infrastruture/repository/product.repository';
import { ProductAttributeRepository } from './infrastruture/repository/product-attribute.repository';
import { ProductVariantRepository } from './infrastruture/repository/product-variant.repository';
import { VariantAttributeRepository } from './infrastruture/repository/variant-attribute.repository';
import { ProductImageRepository } from './infrastruture/repository/product-image.repository';
import { CartRepository } from './infrastruture/repository/cart.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

@Module({
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
export class AppModule {}
