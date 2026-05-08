import { AttributeRepository } from "../../infrastruture/repository/attribute.repository";
import { AttributeDTO } from '../../api/dto/attribute.dto';
export declare class AttributeService {
    private readonly attributeRepo;
    constructor(attributeRepo: AttributeRepository);
    getAll(): Promise<AttributeDTO[]>;
    create(entity: AttributeDTO): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeDTO[]>;
}
