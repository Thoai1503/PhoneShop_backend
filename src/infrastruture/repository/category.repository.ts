import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryRepository } from '../../domain/repositories/icategory.repository.js';
import type { CategoryEntity } from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryRepository
  extends BaseRepository
  implements ICategoryRepository
{
  constructor(
    @Inject(PrismaService) protected readonly prismaService: PrismaService,
  ) {
    super(prismaService);
  }

  async create(item: CategoryEntity): Promise<CategoryEntity> {
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
    return this.toEntity(created);
  }

  async findById(id: number): Promise<CategoryEntity | null> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!category) return null;
    return this.toEntity(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prismaService.categories.findMany();
    return categories.map((c) => this.toEntity(c));
  }

  async update(
    id: number,
    item: CategoryEntity,
  ): Promise<CategoryEntity | null> {
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
    return this.toEntity(updated);
  }

  async deleteById(id: number): Promise<boolean> {
    const existing = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!existing) return false;
    await this.prismaService.categories.delete({ where: { id } });
    return true;
  }

  private toEntity<
    T extends {
      id: number;
      name: string;
      slug: string;
      parent_id: number | null;
      path: string | null;
      level: number | null;
      created_at: Date | null;
    },
  >(c: T): CategoryEntity {
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      parent_id: c.parent_id ?? 0,
      path: c.path ?? '',
      level: c.level ?? 0,
      created_at: c.created_at ?? undefined,
      category_attributes: [],
    };
  }
}
