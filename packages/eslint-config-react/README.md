# Eslint Config React

> Import common eslint config for `React` at once

## Quick start

- Add this package as `devDependencies`
- Add a script command on `package.json`

```json
{
  "scripts": {
    "lint": "pnpm eslint ."
  },
  "devDependencies": {
    "@elton-okawa/eslint-config-react": "workspace:^1.0.0"
  }
}
```

- Create `.eslintrc.json` file on root with the following content:

```json
{
  "extends": ["@elton-okawa/react"]
}
```

## Gotchas

### Why `prettier` must be the last one in `extends`?

There are two kinds of rules:

- code quality rules
- stylistic rules

Usually linters contains both rules which might conflict with `prettier` rules, that's why prettier provides this config to override and disable those rules

Reference:

- [prettier docs](https://prettier.io/docs/en/integrating-with-linters.html)
