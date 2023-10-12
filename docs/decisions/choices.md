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

## Styling

### Why not using a component library like `Material UI (MUI)` or `Chakra UI`?

The idea was writing things from scratch in order to improve my **componentization** and **styling** abilities. In a real world project I'd use:

- `MUI` for completeness and less customization
- `Chackra UI` for easier customization

### Why `Open Props` and not other CSS alternatives like `CSS-in-JS` (emotion, styled components), `Compiled CSS` (scss) or `Utility CSS` (tailwind)?

After reading some other developers thought, I concluded that those libraries were trying to solve the following problems:

- `scope` - we do not want a global style that applies everywhere for all styles
- `organization` - a single global css file can be difficult to manage as the project scales

I think that modern CSS has a solution for these problems because it allow **modules** and has **variables**. `Open Props` takes advantage of those modern features and provides a limited set o choices when choosing color, text size, space etc.
