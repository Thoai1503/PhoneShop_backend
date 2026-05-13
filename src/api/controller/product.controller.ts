import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductService } from '../../application/service/product.service.js';
import {
  ProductAddAndUpdateStateDTO,
  ProductDTO,
  SaveProductContentDTO,
  SaveProductContentResultDTO,
} from '../dto/product.dto.js';
import { CloudinaryService } from '../../service/cloudinary.service.js';

@Controller('api/product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // GET api/product
  @Get()
  async getAll(): Promise<ProductDTO[]> {
    return this.service.getAll();
  }

  // GET api/product/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ProductDTO> {
    const result = await this.service.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  // GET api/product/:id/content
  @Get(':id/content')
  async getProductHtmlContent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ html: string }> {
    const content = await this.service.getHtmlContentByProductId(id);
    if (!content) {
      throw new NotFoundException('Product content not found');
    }
    return { html: content };
  }

  // POST api/product
  @Post()
  async create(
    @Body() product: ProductAddAndUpdateStateDTO,
  ): Promise<ProductDTO> {
    console.log('Received product for creation:', JSON.stringify(product));
    const result = await this.service.createAndReturn(product);
    if (!result)
      throw new InternalServerErrorException({
        message: 'Failed to create product',
      });
    return result;
  }

  // POST api/product/:id/content/upload
  @Post(':id/content/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadContentImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const product = await this.service.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }

    const url = await this.cloudinaryService.uploadProductContentImage(
      file,
      id,
    );
    return { url };
  }

  // POST api/product/:id/content
  @Post(':id/content')
  async saveProductHtmlContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: SaveProductContentDTO,
  ): Promise<SaveProductContentResultDTO> {
    const result = await this.service.saveHtmlContentByProductId(
      id,
      payload.html,
      payload.locale || 'vi',
      payload.change_note,
    );

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }
}
