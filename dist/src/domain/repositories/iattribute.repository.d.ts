import type { AttributeEntity, AttributeValueEntity } from '../entities/attributes/attribute.entity.js';
export interface IAttributeValueRepository {
    findById(id: number): Promise<AttributeValueEntity | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]>;
}
export declare const ATTRIBUTE_VALUE_REPOSITORY: unique symbol;
export interface IAttributeRepository {
    getAll(): Promise<AttributeEntity[]>;
    create(entity: AttributeEntity): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeEntity[]>;
}
export declare const ATTRIBUTE_REPOSITORY: unique symbol;
