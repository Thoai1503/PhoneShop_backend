import { AttributeService } from '../../application/service/attribute.service.js';
import { AttributeDTO } from '../dto/attribute.dto.js';
export declare class AttributeController {
    private readonly service;
    constructor(service: AttributeService);
    getAll(): Promise<AttributeDTO[]>;
    getByCategoryId(categoryId: number): Promise<AttributeDTO[]>;
    create(entity: AttributeDTO): Promise<boolean>;
}
