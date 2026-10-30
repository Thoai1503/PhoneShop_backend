import type { AttributeEntity, AttributeValueEntity } from '../entities/attributes/attribute.entity.js';
export interface IAttributeValueService {
    findById(id: number): Promise<AttributeValueEntity | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]>;
}
export interface IAttributeService {
    getAll(): Promise<AttributeEntity[]>;
    create(entity: AttributeEntity): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeEntity[]>;
}
