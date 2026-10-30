import { type IVariantAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { IVariantAttributeService } from '../../domain/services/iproduct.service.js';
import type { VariantAttributeEntity } from '../../domain/entities/products/product.entity.js';
export declare class VariantAttributeService implements IVariantAttributeService {
    private readonly repo;
    constructor(repo: IVariantAttributeRepository);
    getAll(): Promise<VariantAttributeEntity[]>;
    updateFromList(list: VariantAttributeEntity[]): Promise<boolean>;
}
