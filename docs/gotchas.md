### TypeORM entity constructor

You'll find a strange looking constructor:

```ts
@Entity()
export class Product {
  constructor(params) {
    if (!params) return;

    this.id = params.id;
  }
}
```

This is done because TypeORM instantiate each class with empty arguments so we cannot assume that every entity constructor will have the `params` arguments

From TypeORM docs:

    When using an entity constructor its arguments must be optional. Since ORM creates instances of entity classes when loading from the database, therefore it is not aware of your constructor arguments.

https://typeorm.io/entities#what-is-entity
