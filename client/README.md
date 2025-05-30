# Table of Content

- [Table of Content](#markdown-header-table-of-content)
- [My Mahjong (mj-proj)](#markdown-header-my-mahjiang-mj-proj)
  - [Install the dependencies](#markdown-header-install-the-dependencies)
    - [Start the app in development mode (hot-code reloading, error reporting, etc.)](#markdown-header-start-the-app-in-development-mode-hot-code-reloading-error-reporting-etc)
    - [Lint the files](#markdown-header-lint-the-files)
    - [Format the files](#markdown-header-format-the-files)
    - [Build the app for production](#markdown-header-build-the-app-for-production)
    - [Customize the configuration](#markdown-header-customize-the-configuration)
  - [Install .ts running support](#markdown-header-install-ts-running-support)
    - [Remove yarn global package](#markdown-header-remove-yarn-global-package)
    - [Install npm global package](#markdown-header-install-npm-global-package)
    - [Run ts file](#markdown-header-run-ts-file)

# My Mahjong (mj-proj)

This is MJ Project

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Build the app for production

```bash
yarn build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Install .ts running support

### Remove yarn global package

```bash
yarn global list
```

```bash
# remove
yarn global remove [package-names]
```

### Install npm global package

```bash
npm list -g
npm install -g @quasar/cli \
  create-quasar \
  tsx \
  typescript \
  yarn
```

### Run ts file

```
# either of the following commands will work
tsx file.ts
npx tsx file.tx
```
