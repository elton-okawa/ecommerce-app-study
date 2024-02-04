export abstract class IDomainEvent<T> {
  public readonly createdAt: Date;
  public readonly entity: T;

  constructor(entity: T) {
    this.entity = entity;
    this.createdAt = new Date();
  }
}
