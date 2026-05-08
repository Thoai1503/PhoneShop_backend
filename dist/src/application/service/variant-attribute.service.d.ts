import { VariantAttributeRepository } from '../../infrastruture/repository/variant-attribute.repository';
import { VariantAttributeDTO } from '../../api/dto/product.dto';
export declare class VariantAttributeService {
    private readonly repo;
    constructor(repo: VariantAttributeRepository);
    getAll(): Promise<VariantAttributeDTO[]>;
    updateFromList(list: VariantAttributeDTO[]): Promise<boolean>;
}
