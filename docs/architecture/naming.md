# Naming

## Domain entities vs Database Entities

`Domain Entities` do not have the `Entity` suffix, while `Database Entities` do:

```ts
// domain
export class User {}

// database
export class UserEntity {}
```
