import { type IAttributeValueRepository } from '../../domain/repositories/iattribute.repository.js';
import type { IAttributeValueService } from '../../domain/services/iattribute.service.js';
import type { AttributeValueEntity } from '../../domain/entities/attributes/attribute.entity.js';
export declare class AttributeValueService implements IAttributeValueService {
    private readonly repo;
    constructor(repo: IAttributeValueRepository);
    findById(id: number): Promise<AttributeValueEntity | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]>;
}
