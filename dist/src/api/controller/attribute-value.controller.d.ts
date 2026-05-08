import { AttributeValueService } from '../../application/service/attribute-value.service';
import { AttributeValueDTO } from '../dto/attribute.dto';
export declare class AttributeValueController {
    private readonly service;
    constructor(service: AttributeValueService);
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
}
