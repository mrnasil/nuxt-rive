<script setup lang="ts">
import type { Rive } from '@rive-app/webgl2'

defineOptions({ name: 'PlaygroundPage' })

// Define page meta to use the docs layout but maybe we want a full width layout?
// Let's stick to default 'docs' layout for consistency or 'default' if we want cleaner look.
// 'docs' layout usually has the sidebar which might be distracting for a playground.
// The landing page uses 'default' (implied by no layout set in page meta? No, landing page uses 'full' usually, but here checking app.vue: NuxtLayout).
// Let's use standard layout.

const rive = shallowRef<Rive | null>(null)

const options = {
  fitCanvasToArtboardHeight: true,
  useOffscreenRenderer: true
}

const riveParams = reactive({
  // Bear animation
  src: 'https://public.rive.app/community/runtime-files/2735-5610-bear-trial.riv',
  autoplay: true,
  fit: 'contain' as const,
  alignment: 'center' as const,
  stateMachines: ['Login Machine'],
  artboard: 'Teddy'
})

const textRunName = ref('MyTextRun')
const textRunValue = ref('Hello Rive!')
const logs = ref<string[]>([])

const onRiveLoaded = (riveInstance: Rive) => {
  rive.value = riveInstance
  addLog('System: Rive Loaded')
}

const triggerSuccess = () => {
  if (!rive.value) return
  const input = useRiveStateMachineInput(rive.value, 'Login Machine', 'trigSuccess')
  if (input.value) {
    input.value.fire()
    addLog('Action: Trigger \'trigSuccess\' fired')
  } else {
    addLog('Error: Input \'trigSuccess\' not found')
  }
}

const triggerFail = () => {
  if (!rive.value) return
  const input = useRiveStateMachineInput(rive.value, 'Login Machine', 'trigFail')
  if (input.value) {
    input.value.fire()
    addLog('Action: Trigger \'trigFail\' fired')
  } else {
    addLog('Error: Input \'trigFail\' not found')
  }
}

const setHandsUp = (isUp: boolean) => {
  if (!rive.value) return
  const input = useRiveStateMachineInput(rive.value, 'Login Machine', 'isHandsUp')
  if (input.value) {
    input.value.value = isUp
    addLog(`Action: Set 'isHandsUp' to ${isUp}`)
  } else {
    addLog('Error: Input \'isHandsUp\' not found')
  }
}

const onPlay = (e: unknown) => addLog(`Event: Play - ${(e as { data?: string })?.data || ''}`)
const onPause = (e: unknown) => addLog(`Event: Pause - ${(e as { data?: string })?.data || ''}`)
const onStop = (e: unknown) => addLog(`Event: Stop - ${(e as { data?: string })?.data || ''}`)
const onStateChange = (e: unknown) => addLog(`Event: State Change - ${(e as { data?: string[] })?.data?.join(', ') || ''}`)

function addLog(msg: string) {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (logs.value.length > 20) logs.value.pop()
}

useSeoMeta({
  title: 'Playground - Nuxt Rive',
  description: 'Interactive playground for Nuxt Rive module.'
})
</script>

<template>
  <UContainer class="h-[calc(100vh-var(--ui-header-height))] flex flex-col py-4">
    <div class="shrink-0 mb-4">
      <h1 class="text-2xl font-bold">
        Playground
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Test your Rive animations interactively.
      </p>
    </div>

    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Controls - Scrollable -->
      <div class="flex flex-col gap-4 overflow-y-auto pr-2">
        <UCard>
          <template #header>
            <h3 class="font-semibold text-sm">
              Controls
            </h3>
          </template>

          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <UButton
                block
                variant="soft"
                color="success"
                @click="triggerSuccess"
              >
                Trigger Success
              </UButton>
              <UButton
                block
                variant="soft"
                color="error"
                @click="triggerFail"
              >
                Trigger Fail
              </UButton>
            </div>

            <div class="flex gap-2">
              <UButton
                flex-1
                variant="outline"
                @click="setHandsUp(true)"
              >
                Hands Up
              </UButton>
              <UButton
                flex-1
                variant="outline"
                @click="setHandsUp(false)"
              >
                Hands Down
              </UButton>
            </div>

            <USeparator />

            <div class="space-y-2">
              <label class="text-xs font-medium">Text Runs</label>
              <UInput
                v-model="textRunName"
                placeholder="Run Name (Key)"
                size="sm"
              />
              <UInput
                v-model="textRunValue"
                placeholder="Run Value"
                size="sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-medium">Rive URL</label>
              <UInput
                v-model="riveParams.src"
                placeholder="https://..."
                size="sm"
              />
            </div>
          </div>
        </UCard>

        <UCard class="flex-1 min-h-0 flex flex-col">
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-sm">
                Event Log
              </h3>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                @click="logs = []"
              >
                Clear
              </UButton>
            </div>
          </template>
          <div class="flex-1 min-h-0 overflow-y-auto h-full p-1">
            <div class="text-xs font-mono space-y-1">
              <div
                v-for="(log, i) in logs"
                :key="i"
                class="text-gray-600 dark:text-gray-300 break-all"
              >
                {{ log }}
              </div>
              <div
                v-if="logs.length === 0"
                class="text-gray-400 italic"
              >
                No events yet...
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Column: Canvas - Fixed -->
      <div class="lg:col-span-2 h-full min-h-0">
        <div class="w-full h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-hidden relative flex items-center justify-center">
          <ClientOnly>
            <Rive
              class="w-full h-full"
              :rive-params="riveParams"
              :options="options"
              :text-runs="{ [textRunName]: textRunValue }"
              @rive-is-loaded="onRiveLoaded"
              @play="onPlay"
              @pause="onPause"
              @stop="onStop"
              @statechange="onStateChange"
            />
            <template #fallback>
              <div class="flex flex-col items-center gap-2 text-gray-400">
                <UIcon
                  name="i-svg-spinners-pulse-2"
                  class="w-8 h-8"
                />
                <span>Loading Rive runtime...</span>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </UContainer>
</template>
