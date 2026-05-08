import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastruture/repository/product.repository';
import { ProductDTO, ProductAddAndUpdateStateDTO } from '../../api/dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepository) {}

  async getAll(): Promise<ProductDTO[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<ProductDTO | null> {
    return this.repo.findById(id);
  }

  async createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null> {
    return this.repo.createAndReturn(product);
  }
}
