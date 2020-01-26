# Gitprefix

Gitprefix is a Git `prepare-commit-msg` hook for formatting Git commit messages.

## Features

- Automatic task branch prefix
- Emoji prefixing for certain words:
   - `fix`: 🔧
   - `wip`: 🚧
   - `bug`: 🐛
   - `refactor`: 🔨
   - `revert`: ⏪
   - `pr `: 👌
   - `initial commit`: 🎉
   - `responsive`: 📱
   - `accessibility':`: ♿️
   
## Usage

### Installation

This package is used as an installer for the formatter. To install you can run the following command:

```sh
npx @samturrell/gitprefix install
```

For new git repositories, the hook files wil be added automatically, however for existing projects you can run the following commands to reinitialise:

```sh
npx @samturrell/gitprefix init
```

### Updating

If the package is ever updated you can run the following command to pull down the new formatter and overwrite the existing file: 

```sh
npx @samturrell/gitprefix install --overwrite
```
