import { VariantAttributeService } from '../../application/service/variant-attribute.service.js';
import { VariantAttributeDTO } from '../dto/product.dto.js';
export declare class VariantAttributeController {
    private readonly service;
    constructor(service: VariantAttributeService);
    getAll(): Promise<VariantAttributeDTO[]>;
    updateFromList(list: VariantAttributeDTO[]): Promise<boolean>;
}
