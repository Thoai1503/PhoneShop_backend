import { VariantAttributeService } from '../../application/service/variant-attribute.service';
import { VariantAttributeDTO } from '../dto/product.dto';
export declare class VariantAttributeController {
    private readonly service;
    constructor(service: VariantAttributeService);
    getAll(): Promise<VariantAttributeDTO[]>;
    updateFromList(list: VariantAttributeDTO[]): Promise<boolean>;
}
