import { AttributeValueRepository } from '../../infrastruture/repository/attribute-value.repository';
import { AttributeValueDTO } from '../../api/dto/attribute.dto';
export declare class AttributeValueService {
    private readonly repo;
    constructor(repo: AttributeValueRepository);
    findById(id: number): Promise<AttributeValueDTO | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
}
