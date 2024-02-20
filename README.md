[![nuxt-rive](https://raw.githubusercontent.com/mrnasil/nuxt-rive/main/assets/nuxt-rive.jpg)](https://github.com/mrnasil/nuxt-rive)
# Nuxt-Rive

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Integrate [Rive](https://rive.app) into your [Nuxt](https://nuxt.com) application.

This library allows full control over Rive files with a high-level API for hooking up many simple interactions and animations, as well as a low-level API that allows you to drive your own render loop to create multiple artboards, animations, and state machines all in one canvas.

 ✨ [Release Notes](/CHANGELOG.md)
 ▶️ [Online playground](https://stackblitz.com/~/github.com/mrnasil/nuxt-rive)
 📖 [Documentation](https://help.rive.app/getting-started/introduction)

## Features

- 📦  Extendable by Nuxt modules
- 🚀  Supports Nuxt 3 / Rive


## Rive Overview

[Rive](https://rive.app) is a real-time interactive design and animation tool that helps teams create and run interactive animations anywhere. Designers and developers use our collaborative editor to create motion graphics that respond to different states and user inputs. Our lightweight open-source runtime libraries allow them to load their animations into apps, games, and websites.

🏡 [Homepage](https://rive.app/)

📘 [General help docs](https://help.rive.app/)

🛠 [Learning Rive](https://rive.app/learn-rive)

## Quick Setup

1. Add `nuxt-rive` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-rive

# Using yarn
yarn add --dev nuxt-rive

# Using npm
npm install --save-dev nuxt-rive
```

2. Add `nuxt-rive` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-rive'
  ]
})
```

That's it! You can now use Nuxt-Rive in your Nuxt app ✨

## Contributing

1. Install dependencies with `pnpm`.
2. Run `pnpm dev:prepare` to generate stubbed `dist` directory.
3. Make your changes.
4. Run `pnpm lint`  to verify that there is no issues (consider adding tests).
5. Submit a PR.

## License

This repository is licensed under the [MIT License](LICENSE). Feel free to use the code and modify it according to your needs.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-rive/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-rive

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-rive.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-rive

[license-src]: https://img.shields.io/npm/l/nuxt-rive.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-rive

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
