# User and Cart

## Use case - User does not have an account

Users can fill up their cart while not logged in, as soon as they try to move to checkout they'll be asked to create an account and their current cart will be imported

## Use case - User does have an account but not logged in

Users can fill up their cart while not logged in. After login current cart will override existing one

## Implementation

Cart while not logged in -> frontend cookie, local storage
Cart after login -> stored in backend

## Modeling alternatives

It's an invariant that every `User` has a `Cart`

### `Cart` within `User`'s aggregate

```ts
// create-user.use-case.ts
const cart = Cart.create();
const user = User.create({ cart });
await userRepository.save(user);
```

Pros:

- Atomic save, we never have an `User` without a `Cart`

Cons:

- In order to modify a `Cart`, we must do it through `User`

### Distinct `Cart` and `User` aggregates

#### Direct usage

```ts
// create-user.use-case.ts
const user = User.create();
await Promise.all([
  userRepository.save(user),
  createCartUseCase.handle({ userId: user.id }),
]);
```

Pros:

- `User` and `Cart` can be accessed independently

Cons:

- Transaction not atomic, we might save `User` but fail to save `Cart`

#### Via domain event

```ts
// create-user.use-case.ts
const user = User.create();
await userRepository.save(user);
await newUserEvent.dispatch(user);

// create-cart.use-case.ts -> listens to event
const eventData = ...
const cart = Cart.create({ userId: eventData.userId })
await cartRepository.save(cart);
```

Pros:

- `User` and `Cart` can be accessed independently

Cons:

- Eventual consistency, `User` might not have a `Cart` if requested too soon
