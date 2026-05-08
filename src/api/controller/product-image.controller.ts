import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ProductImageService } from '../../application/service/product-image.service.js';
import { ProductImageDTO } from '../dto/product.dto.js';

@Controller('api/productimage')
export class ProductImageController {
  constructor(private readonly service: ProductImageService) {}

  // DELETE api/productimage/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.delete(id);
  }

  // POST api/productimage/variant/:variantId
  @Post('variant/:variantId')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsFolder = join(process.cwd(), 'Uploads');
          if (!existsSync(uploadsFolder))
            mkdirSync(uploadsFolder, { recursive: true });
          cb(null, uploadsFolder);
        },
        filename: (req, file, cb) => {
          const unique = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
    }),
  )
  async createByVariantId(
    @Param('variantId', ParseIntPipe) _variantId: number,
    @UploadedFiles() images: Express.Multer.File[],
    @Body('product_id') productId: string,
    @Body('variant_id') variantId: string,
  ): Promise<boolean> {
    for (const file of images) {
      const entity = new ProductImageDTO();
      entity.product_id = parseInt(productId, 10);
      entity.variant_id = parseInt(variantId, 10);
      entity.url = file.filename;
      const result = await this.service.create(entity);
      if (!result) return false;
    }
    return true;
  }

  // GET api/productimage/variant/:variantId
  @Get('variant/:variantId')
  async getByVariantId(
    @Param('variantId', ParseIntPipe) variantId: number,
  ): Promise<ProductImageDTO[]> {
    return this.service.getByVariantId(variantId);
  }
}
