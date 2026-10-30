import { type IAttributeRepository } from '../../domain/repositories/iattribute.repository.js';
import type { IAttributeService } from '../../domain/services/iattribute.service.js';
import type { AttributeEntity } from '../../domain/entities/attributes/attribute.entity.js';
export declare class AttributeService implements IAttributeService {
    private readonly attributeRepo;
    constructor(attributeRepo: IAttributeRepository);
    getAll(): Promise<AttributeEntity[]>;
    create(entity: AttributeEntity): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeEntity[]>;
}
