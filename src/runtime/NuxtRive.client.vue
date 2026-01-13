<script setup lang="ts">
import { EventType, Rive } from '@rive-app/webgl2'
import { useWindowSize } from '@vueuse/core'
import {
  ref,
  shallowRef,
  computed,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  nextTick,
} from 'vue'
import type {
  UseRiveParameters,
  UseRiveOptions,
  Dimensions,
} from '../runtime/types/index'

/**
 * Props definition
 *
 */
const props = defineProps<{
  riveParams?: UseRiveParameters
  options?: Partial<UseRiveOptions>
  textRuns?: Record<string, string>
  ariaLabel?: string
}>()

/**
 * Emit defintions
 */
const emit = defineEmits<{
  (e: 'riveIsLoaded', r: Rive): void
  (e: 'play' | 'pause' | 'stop' | 'loop' | 'statechange', event: unknown): void
}>()

/**
 * Template Refs
 */
const canvas = ref<HTMLCanvasElement | null>(null)
const container = ref<HTMLElement | null>(null)

/**
 * Reactive variables
 */
const { width: wWidth, height: wHeight } = useWindowSize()
const riveIsLoaded = ref(false)

const RiveInstance = shallowRef<Rive | null>(null)

// const rive = ref<Rive | null>(null);
const dimensions = ref<Dimensions>({
  width: 0,
  height: 0,
})

const containerStyle = ref<Record<string, string | number>>({})
const canvasStyle = ref<Record<string, string | number>>({})
const canvasSize = ref<Dimensions>({ width: 0, height: 0 })

const animations = computed(() => {
  return props.riveParams?.animations
})

/**
 * Computed Rive Options
 */
const options = computed(() => {
  return Object.assign({}, defaultOptions, props.options)
})

/**
 * Default Rive options will be overwritten if options are passed in
 */
const defaultOptions = {
  useDevicePixelRatio: true,
  fitCanvasToArtboardHeight: false,
  useOffscreenRenderer: true,
}

/**
 * Watches windowsize(height and width) and updates the canvas dimensions
 */
watchEffect(() => {
  if (canvas.value && container.value && wWidth.value && wHeight.value) {
    const { width, height } = getCanvasDimensions()
    const boundsChanged
      = width !== dimensions.value.width || height !== dimensions.value.height
    if (
      canvas.value
      && container.value
      && riveIsLoaded.value
      && boundsChanged
    ) {
      if (options.value.fitCanvasToArtboardHeight) {
        containerStyle.value = { height: `${height}px` }
      }

      if (options.value.useDevicePixelRatio) {
        const dpr = window.devicePixelRatio || 1
        canvasSize.value = {
          width: dpr * width,
          height: dpr * height,
        }
        canvasStyle.value = {
          width: width + 'px',
          height: height + 'px',
        }
      }
      else {
        canvasSize.value = { width, height }
        canvasStyle.value = {}
      }
      dimensions.value = { width, height }

      // Need to resize instance if it exists
      if (RiveInstance.value) {
        RiveInstance.value.startRendering()
        RiveInstance.value.resizeToCanvas()
      }
    }
  }
})

/**
 * watches props.animations and updates the Rive instance
 */
watch(animations, () => {
  if (RiveInstance.value && animations.value) {
    RiveInstance.value.stop(RiveInstance.value.animationNames)
    RiveInstance.value.play(animations.value)
  }
})

/**
 * Watch textRuns prop and update Rive text
 */
watch(() => props.textRuns, (newTextRuns) => {
  if (RiveInstance.value && newTextRuns) {
    for (const [runName, value] of Object.entries(newTextRuns)) {
      try {
        RiveInstance.value.setTextRunValue(runName, value)
      }
      catch (e) {
        console.warn(`[nuxt-rive] Failed to set text run "${runName}":`, e)
      }
    }
  }
}, { deep: true })

/**
 * gets dimensions of container returns width and height
 */
function getCanvasDimensions() {
  const { width, height }
    = container.value?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0)
  if (RiveInstance.value && options.value.fitCanvasToArtboardHeight) {
    const { maxY, maxX } = RiveInstance.value.bounds
    return { width, height: width * (maxY / maxX) }
  }
  return { width, height }
}

/**
 * onMounted initializes the Rive instance
 */
onMounted(() => {
  nextTick(() => {
    if (canvas.value) {
      const { useOffscreenRenderer } = options.value
      const r = new Rive({
        useOffscreenRenderer,
        ...props.riveParams,
        canvas: canvas.value,
      })

      r.on(EventType.Load, () => {
        RiveInstance.value = r
        riveIsLoaded.value = true

        // Initial text runs
        if (props.textRuns) {
          for (const [runName, value] of Object.entries(props.textRuns)) {
            try {
              r.setTextRunValue(runName, value)
            }
            catch {
              // Ignore errors if text run doesn't exist on load
            }
          }
        }

        emit('riveIsLoaded', r)
      })

      r.on(EventType.Play, event => emit('play', event))
      r.on(EventType.Pause, event => emit('pause', event))
      r.on(EventType.Stop, event => emit('stop', event))
      r.on(EventType.Loop, event => emit('loop', event))
      r.on(EventType.StateChange, event => emit('statechange', event))
    }
  })
})

onUnmounted(() => {
  if (RiveInstance.value) {
    RiveInstance.value.stopRendering()
    if (RiveInstance.value.cleanup) {
      // use specific cleanup if available in newer versions or expected behavior
      try {
        RiveInstance.value.cleanup()
      }
      catch (e) {
        console.warn('[nuxt-rive] Error cleaning up Rive instance:', e)
      }
    }
    // Release reference
    RiveInstance.value = null
  }
})

defineExpose({
  RiveInstance,
})
</script>

<template>
  <div
    ref="container"
    :style="containerStyle"
  >
    <canvas
      ref="canvas"
      :width="canvasSize.width"
      :height="canvasSize.height"
      :style="[{ verticalAlign: 'top' }, canvasStyle]"
      role="img"
      :aria-label="props.ariaLabel || 'Rive Animation'"
    />
  </div>
</template>
