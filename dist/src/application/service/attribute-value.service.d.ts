import { AttributeValueRepository } from '../../infrastruture/repository/attribute-value.repository.js';
import { AttributeValueDTO } from '../../api/dto/attribute.dto.js';
export declare class AttributeValueService {
    private readonly repo;
    constructor(repo: AttributeValueRepository);
    findById(id: number): Promise<AttributeValueDTO | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
}
