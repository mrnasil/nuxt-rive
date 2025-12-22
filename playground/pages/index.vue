<script setup lang="ts">
import type { Rive, StateMachineInput } from "@rive-app/webgl";

const rive = shallowRef<Rive | null>(null);
const options = {
  fitCanvasToArtboardHeight: false,
  useOffscreenRenderer: true,
};
const riveParams = {
  //https://rive.app/community/2735-5610-bear-trial/
  src: "https://public.rive.app/community/runtime-files/2735-5610-bear-trial.riv",
  autoplay: true,
  fit: "contain",
  Alignment: "center",
  isAnimationStateMachine: true,
  stateMachines: "Login Machine",
  artboard: "Teddy",
};

const riveHandler = (riveInstance: Rive) => {
  rive.value = riveInstance;
  useRiveStateMachineInput(rive, "Login Machine", "trigSuccess");
};

const clickHandler = () => {
  if (rive.value) {
    rive.value.play("hands_down");
    const trigSuccess: StateMachineInput | null = useRiveStateMachineInput(
      rive,
      "Login Machine",
      "trigSuccess"
    );
    if (trigSuccess) {
      trigSuccess.fire();
    }
  }
};

const outsideClick = () => {
  if (rive.value) {
    rive.value.play("Hands_up");
  }
};
const textRunValue = ref("Hello Rive!");
const textRunName = ref("MyTextRun");
const lastEvent = ref("");

const onPlay = (e: any) => {
  lastEvent.value = `Play: ${e?.data?.join(', ') || 'Animation Started'}`;
};

const onPause = (_e: any) => {
  lastEvent.value = "Paused";
};

onMounted(() => {
  if (rive.value) {
    rive.value.play("Hands_up");
  }
});
</script>
<template>
  <div style="font-family: sans-serif; padding: 20px;">
    <h1>Nuxt Rive Playground</h1>
    
    <div style="margin-bottom: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
      <p><strong>Note:</strong> The default "Bear" animation may not have text runs.</p>
      <p>To test text runs, load a Rive file with exported text and enter its name below.</p>
      
      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <label>
          Run Name (Key):
          <input v-model="textRunName" type="text" placeholder="e.g. MyTextRun">
        </label>
        <label>
          Run Value:
          <input v-model="textRunValue" type="text" placeholder="Enter text...">
        </label>
      </div>
    </div>

    <ClientOnly>
      <Rive
        id="rive"
        ref="riveComp"
        :rive-params="riveParams"
        :options="options"
        :text-runs="{ [textRunName]: textRunValue }"
        @click="clickHandler"
        @rive-is-loaded="riveHandler"
        @play="onPlay"
        @pause="onPause"
      />
    </ClientOnly>

    <div style="margin-top: 20px;">
      <button @click="outsideClick">
        Trigger Animation
      </button>
      <p>Last Event: {{ lastEvent }}</p>
    </div>
  </div>
</template>
