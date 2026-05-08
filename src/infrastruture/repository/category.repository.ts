import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Category } from '../model/category.modal';
import { PrismaService } from '../database/prisma.service';
import { CategoryDTO } from '../../api/dto/category.dto';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @Inject(PrismaService) protected readonly prismaService: PrismaService,
  ) {
    super(prismaService);
  }

  async create(item: CategoryDTO): Promise<CategoryDTO> {
    const created = await this.prismaService.categories.create({
      data: {
        name: item.name,
        slug: item.slug,
        parent_id: item.parent_id ?? null,
        path: item.path ?? null,
        level: item.level ?? 0,
        created_at: new Date(),
      },
    });
    return this.toDTO(created);
  }

  async findById(id: number): Promise<CategoryDTO | null> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!category) return null;
    return this.toDTO(category);
  }

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await this.prismaService.categories.findMany();
    return categories.map((c) => this.toDTO(c));
  }

  async update(id: number, item: CategoryDTO): Promise<CategoryDTO | null> {
    const existing = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!existing) return null;
    const updated = await this.prismaService.categories.update({
      where: { id },
      data: {
        name: item.name ?? existing.name,
        slug: item.slug ?? existing.slug,
        parent_id: item.parent_id ?? existing.parent_id,
        path: item.path ?? existing.path,
        level: item.level ?? existing.level,
      },
    });
    return this.toDTO(updated);
  }

  async deleteById(id: number): Promise<boolean> {
    const existing = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!existing) return false;
    await this.prismaService.categories.delete({ where: { id } });
    return true;
  }

  private toDTO(c: any): CategoryDTO {
    const dto = new CategoryDTO();
    dto.id = c.id;
    dto.name = c.name;
    dto.slug = c.slug;
    dto.parent_id = c.parent_id ?? 0;
    dto.path = c.path ?? '';
    dto.level = c.level ?? 0;
    dto.created_at = c.created_at;
    return dto;
  }
}
