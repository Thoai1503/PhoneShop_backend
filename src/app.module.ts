import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './infrastruture/database/prisma.module.js';
import { MulterModule } from '@nestjs/platform-express';

// Controllers
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
import { ProvinceController } from './api/controller/province.controller.js';
import { DistrictController } from './api/controller/district.controller.js';
import { WardController } from './api/controller/ward.controller.js';
import { UserAddressController } from './api/controller/user-address.controller.js';
import { OrderController } from './api/controller/order.controller.js';
import { OrderDetailController } from './api/controller/order-detail.controller.js';
import { VNPayPaymentController } from './api/controller/vnpay-payment.controller.js';
import { MoMoPaymentController } from './api/controller/momo-payment.controller.js';

// Services
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
import { ProvinceService } from './application/service/province.service.js';
import { DistrictService } from './application/service/district.service.js';
import { WardService } from './application/service/ward.service.js';
import { UserAddressService } from './application/service/user-address.service.js';
import { OrderService } from './application/service/order.service.js';
import { OrderDetailService } from './application/service/order-detail.service.js';
import { PaymentService } from './application/service/payment.service.js';

// Repositories
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
import { ProvinceRepository } from './infrastruture/repository/province.repository.js';
import { DistrictRepository } from './infrastruture/repository/district.repository.js';
import { WardRepository } from './infrastruture/repository/ward.repository.js';
import { UserAddressRepository } from './infrastruture/repository/user-address.repository.js';
import { OrderRepository } from './infrastruture/repository/order.repository.js';
import { OrderDetailRepository } from './infrastruture/repository/order-detail.repository.js';
import { PaymentRepository } from './infrastruture/repository/payment.repository.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from './api/controller/auth.controller.js';
import { AuthService } from './application/service/auth.service.js';
import { UsersRepository } from './infrastruture/repository/user.repository.js';
import PasswordService from './application/service/password.service.js';
import JWTService from './application/service/JWT.service.js';
import { LoggingInterceptor } from './infrastruture/interceptor/logging.interceptor.js';
import { LoggerService } from './application/service/logger.service.js';
import { LoggerMiddleware } from './application/middleware/logger.middleware.js';
import { MailService } from './service/mail.service.js';
import { CloudinaryService } from './service/cloudinary.service.js';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({}),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'Uploads'),
      serveRoot: '/Uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
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
    AuthController,
    ProvinceController,
    DistrictController,
    WardController,
    UserAddressController,
    OrderController,
    OrderDetailController,
    VNPayPaymentController,
    MoMoPaymentController,
  ],
  providers: [
    AppService,
    AuthService,
    CategoryService,
    JWTService,
    PasswordService,
    MailService,
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
    ProvinceService,
    DistrictService,
    WardService,
    UserAddressService,
    OrderService,
    OrderDetailService,
    PaymentService,
    CategoryRepository,
    AttributeRepository,
    AttributeValueRepository,
    BrandRepository,
    CategoryAttributeRepository,
    UsersRepository,
    CategoryBrandRepository,
    ProductRepository,
    ProductAttributeRepository,
    ProductVariantRepository,
    VariantAttributeRepository,
    ProductImageRepository,
    CartRepository,
    ProvinceRepository,
    DistrictRepository,
    WardRepository,
    UserAddressRepository,
    OrderRepository,
    OrderDetailRepository,
    PaymentRepository,
    MailService,
    LoggerService,
    CloudinaryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        console.log(
          `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
        );
        next();
      })
      .forRoutes('*')
      .apply(LoggerMiddleware)
      .forRoutes(AuthController);
  }
}
