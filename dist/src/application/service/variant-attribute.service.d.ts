import { VariantAttributeRepository } from '../../infrastruture/repository/variant-attribute.repository.js';
import { VariantAttributeDTO } from '../../api/dto/product.dto.js';
export declare class VariantAttributeService {
    private readonly repo;
    constructor(repo: VariantAttributeRepository);
    getAll(): Promise<VariantAttributeDTO[]>;
    updateFromList(list: VariantAttributeDTO[]): Promise<boolean>;
}
