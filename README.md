# @owenvoke/semantic-release-config

[`semantic-release`](https://github.com/semantic-release/semantic-release) shareable config for owenvoke.

## Plugins

This shareable configuration uses the following plugins:

- [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer)
- [`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator)
- [`semantic-release-export-data`](https://github.com/felipecrs/semantic-release-export-data)

## Install

```shell
npm install --save-dev semantic-release @owenvoke/semantic-release-config
```

## Usage

The shareable config can be configured in the [**semantic release** configuration file](https://semantic-release.gitbook.io/semantic-release/usage/configuration):

```json
{
  "extends": "@owenvoke/semantic-release-config"
}
```

## Configuration

This shareable config is based on the [Angular preset](https://www.npmjs.com/package/conventional-changelog-angular), with the following changes:

- The `chore` type is counted as a patch release.
  - This excludes the `deps` and `deps-dev` scopes to prevent releases for every Dependabot update.
- The `refactor` and `style` types are counted as a patch release.
