<script setup lang="ts">
// for testing purposes with auto-import disabled
import { Rive } from '#components'

const riveParams = {
  src: '/rive/animation.riv',
  autoplay: true,
  fit: 'contain',
  alignment: 'center',
  artboard: 'Artboard 1',
  animations: ['idle'],
  events: {
    idle: {
      type: 'loop',
      callback: () => {
        console.log('idle animation looped')
      },
    },
  },
}

const options = {
  canvas: {
    width: 300,
    height: 300,
  },
  debug: true,
}
</script>
<template>
<div>
    <Rive :riveParams="riveParams" :options="options">
        Deneme
    </Rive>
</div>
</template>