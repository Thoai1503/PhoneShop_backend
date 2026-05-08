import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductVariantService } from '../../application/service/product-variant.service.js';
import {
  FilterStateDTO,
  ProductVariantDTO,
  ProductVariantPaginatedDTO,
} from '../dto/product.dto.js';

@Controller('api/productvariant')
export class ProductVariantController {
  constructor(private readonly service: ProductVariantService) {}

  // GET api/productvariant?skip=0&take=10&category=...&attributes.X=...
  @Get()
  async getAll(
    @Query() query: Record<string, any>,
  ): Promise<ProductVariantPaginatedDTO> {
    const st = this.parseFilterState(query);
    return this.service.getPaginationData(st);
  }

  // GET api/productvariant/:id
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductVariantDTO> {
    const result = await this.service.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  // POST api/productvariant
  @Post()
  async create(@Body() entity: ProductVariantDTO): Promise<boolean> {
    return this.service.create(entity);
  }

  // POST api/productvariant/Update
  @Post('Update')
  async updateVariant(@Body() entity: ProductVariantDTO): Promise<boolean> {
    const result = await this.service.update(entity);
    if (!result) throw new NotFoundException();
    return result;
  }

  // DELETE api/productvariant/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.delete(id);
  }

  // GET api/productvariant/product/:productId
  @Get('product/:productId')
  async findByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductVariantDTO[]> {
    return this.service.findByProductId(productId);
  }

  private parseFilterState(query: Record<string, any>): FilterStateDTO {
    const st = new FilterStateDTO();
    if (query['skip']) st.skip = parseInt(query['skip'], 10) || 0;
    if (query['take']) st.take = parseInt(query['take'], 10) || 10;
    if (query['sortBy']) st.sortBy = query['sortBy'];
    if (query['order']) st.order = query['order'];
    if (query['category']) st.category = query['category'];
    if (query['minPrice']) st.minPrice = parseFloat(query['minPrice']) || null;
    if (query['maxPrice']) st.maxPrice = parseFloat(query['maxPrice']) || null;

    if (query['categoryIds']) {
      const raw: string = Array.isArray(query['categoryIds'])
        ? query['categoryIds'].join(',')
        : query['categoryIds'];
      st.categoryIds = raw
        .split(',')
        .map((x) => parseInt(x.trim(), 10))
        .filter((x) => !isNaN(x) && x > 0);
    }

    // Parse attributes.X=val1,val2
    for (const [key, value] of Object.entries(query)) {
      if (key.startsWith('attributes.')) {
        const attrKey = key.replace('attributes.', '');
        const raw = Array.isArray(value) ? value.join(',') : String(value);
        st.attributes[attrKey] = raw
          .split(',')
          .map((v) => v.trim())
          .filter((v) => v.length > 0);
      }
    }

    return st;
  }
}
