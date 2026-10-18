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

## Reusable workflow

This repository also provides a reusable GitHub Actions workflow. It works out the next version from your commits using this config, then creates a draft GitHub release with the generated release notes. `0.x` releases are marked as pre-releases. The repository doesn't need Node.js or `semantic-release` installed, so it works for any language.

```yaml
name: Auto-Release

on:
  push:
    branches:
      - main

jobs:
  release:
    permissions:
      contents: write
    uses: owenvoke/semantic-release-config/.github/workflows/release.yml@main
```

To lock to a specific version, replace `@main` with a release tag (e.g. `@v1.3.0`).

Publishing the draft release creates the tag, which can then trigger any publishing workflows (e.g. `on: release: types: [published]`).

| Input                  | Default  | Description                                                                         |
|------------------------|----------|-------------------------------------------------------------------------------------|
| `node-version`         | `lts/*`  | The Node.js version used to run `semantic-release`.                                 |
| `config-version`       | `latest` | The version of `@owenvoke/semantic-release-config` to use.                          |
| `install-dependencies` | `false`  | Run `npm ci` first (needed if the repository's own release config imports packages). |
| `draft`                | `true`   | Create a draft GitHub release for the resolved version.                             |

The workflow outputs `new-release-published`, `new-release-version`, `new-release-git-tag` and `new-release-notes`, which later jobs can use via `needs.release.outputs.*`.

## Configuration

This shareable config is based on the [Conventional Commits preset](https://www.npmjs.com/package/conventional-changelog-conventionalcommits), with the following changes:

- The `chore` type is counted as a patch release.
  - This excludes the `deps` and `deps-dev` scopes to prevent releases for every Dependabot update.
- The `refactor` and `style` types are counted as a patch release.
- Breaking changes on a `0.x` version are counted as a minor release (e.g. `0.3.1` → `0.4.0`).
  - To release `1.0.0`, tag the release manually.
