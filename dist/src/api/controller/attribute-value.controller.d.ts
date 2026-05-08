import { AttributeValueService } from '../../application/service/attribute-value.service.js';
import { AttributeValueDTO } from '../dto/attribute.dto.js';
export declare class AttributeValueController {
    private readonly service;
    constructor(service: AttributeValueService);
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
}
