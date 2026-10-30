export interface IBaseRepository<TEntity, TCreateInput, TId = number> {
    create(input: TCreateInput): Promise<TEntity>;
    findById(id: TId): Promise<TEntity | null>;
    findAll(): Promise<TEntity[]>;
    update(id: TId, input: Partial<TCreateInput>): Promise<TEntity | null>;
    delete(id: TId): Promise<boolean>;
}
