import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastruture/repository/category.repository';
import { CategoryDTO } from 'src/api/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAll(): Promise<CategoryDTO[]> {
    return this.categoryRepository.findAll();
  }

  findById(id: number): Promise<CategoryDTO | null> {
    return this.categoryRepository.findById(id);
  }

  createCategory(categoryData: CategoryDTO): Promise<CategoryDTO> {
    return this.categoryRepository.create(categoryData);
  }

  updateCategory(id: number, categoryData: CategoryDTO): Promise<CategoryDTO | null> {
    return this.categoryRepository.update(id, categoryData);
  }

  deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.deleteById(id);
  }
}
