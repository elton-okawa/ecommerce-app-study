# Folder structure

Inspired by https://github.com/stemmlerjs/white-label

## Root

Every shared or generic items will be placed here

```
config
core
modules
infra
interfaces
utils
```

## Modules

```
domain
infra
interfaces
mappers
repositories
subscribers
use-cases
```

### Interfaces

```
graphql
- inputs
- objects
http
- dtos
```

## Examples

```
config
core
modules
- auth
  - domain
  - infra
  - mappers
  - repositories
  - subscribers
  - use-cases
- payment
  - domain
  - infra
  - mappers
  - repositories
  - subscribers
  - use-cases
infra
utils
```
