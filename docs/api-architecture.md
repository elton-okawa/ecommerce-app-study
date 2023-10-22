### Result pattern

Business rules, validations and so on are all performed in `domain layer` and usually all of them invalidate the operation.
The usual approach is throwing an error:

```ts
function createUser(username: string, password: string) {
  const existing = await userRepository.findByUsername(username);
  if (existing) {
    throw new HttpError(UNPROCESSABLE_ENTITY, "username already taken");
  }

  await userService.create(username, password);
}
```

Here we are committing to use an Http infrastructure, in most cases, it's not a problem because we are going to use http without any doubts and using that way simplifies our code.

But, as a study repository, we'll not do this and see how much work we are avoiding by not keeping our domain layer a hundred percent pure.
In order to achieve this, we'll use a `Result pattern`, basically our domain functions will return an `Result` object that contains either the result or an error that we can check at the `Infrastructure Layer` to throw an http error.

```ts
// domain
function createUser(username: string, password: string) {
  const existing = await userRepository.findByUsername(username);
  if (existing) {
    return Result.error("username already taken");
  }

  await userService.create(username, password);
  return Result.success();
}

// infra http
function createUser(username: string, password: string) {
  const result = await userService.createUser(username, password);
  if (result.isError) {
    throw new HttpError(UNPROCESSABLE_ENTITY, result.error);
  }
}
```

References:

- https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/

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
