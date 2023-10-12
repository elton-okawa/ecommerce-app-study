# Prettier config

> Import common prettier config at once

## Quick start

- Add this package as `devDependencies`
- Add a script command on `package.json`

```json
{
  "scripts": {
    "format": "pnpm prettier --write ."
  },
  "devDependencies": {
    "@elton-okawa/prettier-config": "workspace:^1.0.0"
  }
}
```

- Create `.prettierignore` to avoid formatting especific files and folders

```
dist
build
```

## References

- [Prettier docs](https://prettier.io/docs/en/)
