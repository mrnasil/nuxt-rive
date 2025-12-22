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

## Basic Usage

Use the `<Rive>` component to render your animations:

```vue
<template>
  <ClientOnly>
    <Rive
      :rive-params="{
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        autoplay: true,
        stateMachines: 'bumpy',
        artboard: 'Truck'
      }"
      :options="{
        fitCanvasToArtboardHeight: true,
        useOffscreenRenderer: true
      }"
    />
  </ClientOnly>
</template>
```

## Features

- **Component-Based**: Easy-to-use `<Rive>` component.
- **SSR Compatible**: Works seamlessly with Nuxt (use `<ClientOnly>` wrapper).
- **Interactive**: Full control via `useRiveStateMachineInput`.
- **Dynamic Text**: Update text runs at runtime with the `text-runs` prop.
- **Events**: Listen to Rive events like Play, Pause, Stop, Loop, and StateChange.
- **Efficient**: Uses `@rive-app/webgl` for high-performance rendering.

## Component Props

| Prop | Type | Description |
| --- | --- | --- |
| `rive-params` | `UseRiveParameters` | Configuration object for the Rive instance (src, artboard, stateMachines, etc.). |
| `options` | `UseRiveOptions` | Runtime options like `fitCanvasToArtboardHeight` and `useOffscreenRenderer`. |
| `text-runs` | `Record<string, string>` | **(New)** Replaces text run values dynamically. Key is the run name, value is the new text. |

### `rive-params` Interface
```ts
interface UseRiveParameters {
  src?: string;
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  layout?: Layout;
  autoplay?: boolean;
  // ...and more standard Rive parameters
}
```

## Events

The `<Rive>` component emits the following events:

- `@rive-is-loaded`: Triggered when the Rive instance is fully loaded. Returns the `Rive` instance.
- `@play`: Triggered when an animation starts playing.
- `@pause`: Triggered when an animation is paused.
- `@stop`: Triggered when an animation stops.
- `@loop`: Triggered when an animation loops.
- `@statechange`: Triggered when a state machine changes state.

## Composables

### `useRiveStateMachineInput`

Helper composable to control State Machine inputs (Triggers, Booleans, Numbers).

```ts
const { RiveInstance } = await useRive() // or get instance from @rive-is-loaded

// Trigger an input
useRiveStateMachineInput(RiveInstance, 'StateMachineName', 'InputName').fire()

// Set a boolean
const boolInput = useRiveStateMachineInput(RiveInstance, 'StateMachineName', 'BooleanInput')
boolInput.value = true

// Set a number
const numInput = useRiveStateMachineInput(RiveInstance, 'StateMachineName', 'NumberInput')
numInput.value = 50
```

## Dynamic Text Example

```vue
<template>
  <Rive
    :rive-params="{ src: 'my-file.riv' }"
    :text-runs="{
      'MyTextRun': 'Dynamic Value',
      'Score': '100'
    }"
  />
</template>
```

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
