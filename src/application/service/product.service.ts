import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastruture/repository/product.repository.js';
import {
  ProductDTO,
  ProductAddAndUpdateStateDTO,
  SaveProductContentResultDTO,
} from '../../api/dto/product.dto.js';

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepository) {}

  async getAll(): Promise<ProductDTO[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<ProductDTO | null> {
    return this.repo.findById(id);
  }

  async createAndReturn(
    product: ProductAddAndUpdateStateDTO,
  ): Promise<ProductDTO | null> {
    return this.repo.createAndReturn(product);
  }

  async saveHtmlContentByProductId(
    productId: number,
    html: string,
    locale = 'vi',
    changeNote?: string | null,
  ): Promise<SaveProductContentResultDTO | null> {
    return this.repo.saveHtmlContentByProductId(
      productId,
      html,
      locale,
      changeNote,
    );
  }

  async getHtmlContentByProductId(productId: number): Promise<string | null> {
    return this.repo.getHtmlContentByProductId(productId);
  }
}
