[![nuxt-rive](https://raw.githubusercontent.com/mrnasil/nuxt-rive/main/assets/nuxt-rive.jpg)](https://github.com/mrnasil/nuxt-rive)
# Nuxt-Rive

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Integrate [Rive](https://rive.app) into your [Nuxt](https://nuxt.com) application.

This library allows full control over Rive files with a high-level API for hooking up many simple interactions and animations, as well as a low-level API that allows you to drive your own render loop to create multiple artboards, animations, and state machines all in one canvas.

 ✨ [Release Notes](/CHANGELOG.md)
 ▶️ [Online playground](https://nuxt-rive.pages.dev/playground)
📖 [Documentation](https://nuxt-rive.pages.dev/)

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

Use the `<NuxtRive>` component to render your animations:

```vue
<template>
  <ClientOnly>
    <NuxtRive
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

- **Component-Based**: Easy-to-use `<NuxtRive>` component.
- **SSR Compatible**: Works seamlessly with Nuxt (use `<ClientOnly>` wrapper).
- **Interactive**: Full control via `useRiveStateMachineInput`.
- **Dynamic Text**: Update text runs at runtime with the `text-runs` prop.
- **Events**: Listen to Rive events like Play, Pause, Stop, Loop, and StateChange.
- **Efficient**: Uses `@rive-app/webgl2` for high-performance rendering.
- **Nuxt DevTools**: Integrated DevTools tab to view and manage your Rive assets.

## Nuxt DevTools Integration

`nuxt-rive` comes with a custom tab for Nuxt DevTools that allows you to:
- **Explore** all Rive assets in your project (public and assets directories).
- **Preview** animations directly within the DevTools.
- **Inspect** file details like size and path.
- **Copy** usage snippets for quick integration into your components.

To use it, simply open Nuxt DevTools in your development environment and click on the **Nuxt Rive** tab.

> The DevTools tab and its server routes are only registered in development, so nothing is added to your production build.

## Component Props

| Prop | Type | Description |
| --- | --- | --- |
| `rive-params` | `UseRiveParameters` | Configuration object for the Rive instance (src, artboard, stateMachines, etc.). |
| `options` | `UseRiveOptions` | Runtime options: `useDevicePixelRatio`, `fitCanvasToArtboardHeight` and `useOffscreenRenderer`. |
| `text-runs` | `Record<string, string>` | Replaces text run values dynamically. Key is the run name, value is the new text. |
| `aria-label` | `string` | Accessible label for the canvas (default: `Rive Animation`). |

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

The `<NuxtRive>` component emits the following events:

- `@rive-is-loaded`: Triggered when the Rive instance is fully loaded. Returns the `Rive` instance.
- `@play`: Triggered when an animation starts playing.
- `@pause`: Triggered when an animation is paused.
- `@stop`: Triggered when an animation stops.
- `@loop`: Triggered when an animation loops.
- `@statechange`: Triggered when a state machine changes state.

## Composables

### `useRiveStateMachineInput`

Helper composable to control State Machine inputs (Triggers, Booleans, Numbers).

```vue
<script setup lang="ts">
import type { Rive } from 'nuxt-rive'

// Get the instance from @rive-is-loaded
const rive = shallowRef<Rive | null>(null)

// Each call returns a ComputedRef<StateMachineInput | null>
const trigger = useRiveStateMachineInput(rive, 'StateMachineName', 'InputName')
const boolInput = useRiveStateMachineInput(rive, 'StateMachineName', 'BooleanInput')
const numInput = useRiveStateMachineInput(rive, 'StateMachineName', 'NumberInput')

function update() {
  trigger.value?.fire() // Trigger an input
  if (boolInput.value) boolInput.value.value = true // Set a boolean
  if (numInput.value) numInput.value.value = 50 // Set a number
}
</script>

<template>
  <NuxtRive
    :rive-params="{ src: 'my-file.riv', stateMachines: 'StateMachineName' }"
    @rive-is-loaded="rive = $event"
  />
</template>
```

## Dynamic Text Example

```vue
<template>
  <NuxtRive
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
4. Run `pnpm lint` and `pnpm test` to verify that there are no issues (consider adding tests).
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
