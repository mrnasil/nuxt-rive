<script setup lang="ts">
import type { UseRiveParameters, UseRiveOptions } from './Rive..vue';
import { EventType, Rive } from '@rive-app/webgl';
import { useWindowSize } from '@vueuse/core';

/**
 * Props definition
 *
 */
 const props = defineProps<{
  riveParams?: UseRiveParameters;
  options?: Partial<UseRiveOptions>;
}>();

</script>
<template>
<div>
    <pre>
      {{ props.riveParams }}
      {{ props.options }}
    </pre>
</div>
</template>