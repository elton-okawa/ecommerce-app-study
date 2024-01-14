# Value Objects

How to distinguish between `Entity` or `Value Object`?

- When we care about the model's identity
- Two `Entities` are equal when their identifier are equal, e.g. id field
- Two `Value Objects` are equal when their structure and values are the same

## Validation

**Great place to put validations and constraints** such as not `null` or `undefined` because it's they must be applied regardless the operation (create or edit)

### Example

Naive approach -> place on services but with duplicated logic

```ts
// create-user.ts
function createUser(name: string) {
  if (name === null || name === undefined) throw new Error();

  return new User();
}

// edit-user.ts
function editUser(name: string) {
  if (name === null || name === undefined) throw new Error();

  const user = getUser();
  user.name = name;
  return user;
}
```

Naive approach 2 -> place on services and share logic

```ts
// commons-user.ts
function isValidName(name: string) {
  return name !== null && name !== undefined;
}

// create-user.ts
function createUser(name: string) {
  if (!isValidName(name)) throw new Error();
  ...
}

// edit-user.ts
function editUser(name: string) {
  if (!isValid(name)) throw new Error();
  ...
}
```

Those approaches work but we are relying that our services will call the appropriate method before executing the operation and we are not encapsulating logic on our domain:

```ts
class User {
  public static create(name: string) {
    const res = Name.create(name);
    if (res.error) return res;

    this.name = res.value;
  }
}

class Name {
  public static create(name: string) {
    if (name === null || name === undefined)
      return Result.error("validation error");

    return Result.success(new Name({ name }));
  }
}
```

## References

- https://khalilstemmler.com/articles/typescript-value-object/
