### Domain entities with TypeORM decorators

TypeORM does the job of mapping `DB columns <-> Entity` so at the end it's overly repetitive to have different files for `Domain Entities` and `DB Entities` just for the sake of not having `TypeORM decorators` at our domain entity, such as:

```ts
// domain
export class User {
  id: string;
  username: string;
  private _password: Password;

  get password() {
    return this._password.toString();
  }

  // constructor and domain methods
}

// db
@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({
    type: String,
    transformer: {
      from: (password) => Password.from(password),
      to: (password) => password.toString(),
    },
  })
  password: Password;
}
```

That's why I'm going to have them mixed together for the sake of simplicity.
