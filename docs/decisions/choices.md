# About decisions

## General

### Why using `pnpm` instead of `yarn` or `npm`?

Mainly because `pnpm` has support for monorepos, the [website](https://pnpm.io/) also says that it's faster than alternatives and efficient

### Why using monorepo and different packages for each component?

The idea was to experiment the suggested architecture from [Developer Way website](https://www.developerway.com/posts/react-project-structure) which brings advantages like:

- **Aliasing** - avoid relative path hell
- **Separation of concerns** - a `button` package shouldn't have more than things related to a button
- **Easy refactoring** - as long as the API remains the same, we can change everything without being noticed
- **Explicit entry points** - we always import the package root `@elton-okawa/button` and not things like `@elton-okawa/button/components/Button.tsx`
