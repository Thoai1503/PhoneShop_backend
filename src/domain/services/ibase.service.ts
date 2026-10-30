export interface IBaseService<TEntity, TCreateInput> {
  create(input: TCreateInput): Promise<TEntity>;
  getAll(): Promise<TEntity[]>;
}
