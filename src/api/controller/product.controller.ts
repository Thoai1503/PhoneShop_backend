import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductService } from '../../application/service/product.service.js';
import {
  ProductAddAndUpdateStateDTO,
  ProductDTO,
  ProductUpdateDTO,
  SaveProductContentDTO,
  SaveProductContentResultDTO,
} from '../dto/product.dto.js';
import { CloudinaryService } from '../../service/cloudinary.service.js';
import { AuthGuard } from '../../auth/auth.guard.js';

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
  @Header(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async getProductHtmlContent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ html: string }> {
    const content = await this.service.getHtmlContentByProductId(id);
    if (!content) {
      throw new NotFoundException('Product content not found');
    }
    return { html: content };
  }

  // GET api/product/:id/content/published
  @Get(':id/content/published')
  async getPublishedProductHtmlContent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ html: string }> {
    const content = await this.service.getPublishedHtmlContentByProductId(id);
    if (!content) {
      throw new NotFoundException('Published product content not found');
    }
    return { html: content };
  }

  // GET api/product/:id/content/versions
  @Get(':id/content/versions')
  async getContentVersions(@Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getVersionsList(id);
    if (!result) {
      throw new NotFoundException('Product content not found');
    }
    return result;
  }

  // GET api/product/:id/content/versions/:versionId
  @Get(':id/content/versions/:versionId')
  async getContentVersionDetail(
    @Param('id', ParseIntPipe) id: number,
    @Param('versionId', ParseIntPipe) versionId: number,
  ) {
    const result = await this.service.getVersionDetail(id, versionId);
    if (!result) {
      throw new NotFoundException('Version not found');
    }
    return result;
  }

  // GET api/product/:id/content/compare/:v1/:v2
  @Get(':id/content/compare/:v1/:v2')
  async compareVersions(
    @Param('id', ParseIntPipe) id: number,
    @Param('v1', ParseIntPipe) v1: number,
    @Param('v2', ParseIntPipe) v2: number,
  ) {
    const result = await this.service.compareVersions(id, v1, v2);
    if (!result) {
      throw new NotFoundException('Versions not found');
    }
    return result;
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

  // POST api/product/:id
  @UseGuards(AuthGuard)
  @Post(':id')
  async update(
    @Req() request: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() product: ProductUpdateDTO,
  ): Promise<ProductDTO> {
    if (!request.admin) {
      throw new BadRequestException('Only admin can update product');
    }
    const result = await this.service.updateAndReturn(id, product);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
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

  // POST api/product/:id/content/versions/:versionId/publish
  @Post(':id/content/versions/:versionId/publish')
  async publishVersion(
    @Param('id', ParseIntPipe) id: number,
    @Param('versionId', ParseIntPipe) versionId: number,
  ) {
    const result = await this.service.publishVersion(id, versionId);
    if (!result) {
      throw new NotFoundException('Version not found');
    }
    return result;
  }

  // POST api/product/:id/content/versions/:versionId/restore
  @Post(':id/content/versions/:versionId/restore')
  async restoreVersion(
    @Param('id', ParseIntPipe) id: number,
    @Param('versionId', ParseIntPipe) versionId: number,
  ) {
    const result = await this.service.restoreVersion(id, versionId);
    if (!result) {
      throw new NotFoundException('Version not found');
    }
    return result;
  }

  // DELETE api/product/:id/content/versions/:versionId
  @Delete(':id/content/versions/:versionId')
  async deleteVersion(
    @Param('id', ParseIntPipe) id: number,
    @Param('versionId', ParseIntPipe) versionId: number,
  ) {
    const result = await this.service.deleteVersion(id, versionId);
    if (!result) {
      throw new BadRequestException(
        'Cannot delete draft or published versions',
      );
    }
    return { success: true };
  }
}
