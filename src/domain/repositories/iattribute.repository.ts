import type {
  AttributeEntity,
  AttributeValueEntity,
} from '../entities/attributes/attribute.entity.js';

export interface IAttributeValueRepository {
  findById(id: number): Promise<AttributeValueEntity | null>;
  getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]>;
}
export const ATTRIBUTE_VALUE_REPOSITORY = Symbol('ATTRIBUTE_VALUE_REPOSITORY');

export interface IAttributeRepository {
  getAll(): Promise<AttributeEntity[]>;
  create(entity: AttributeEntity): Promise<boolean>;
  getByCategoryId(categoryId: number): Promise<AttributeEntity[]>;
}
export const ATTRIBUTE_REPOSITORY = Symbol('ATTRIBUTE_REPOSITORY');
