export declare class AttributeValueDTO {
    id: number;
    attribute_id: number;
    value: string;
}
export declare class AttributeDTO {
    id: number;
    name: string;
    slug: string;
    data_type: string;
    unit: string;
    status: number;
    is_selected: number;
    attribute_values: AttributeValueDTO[];
}
