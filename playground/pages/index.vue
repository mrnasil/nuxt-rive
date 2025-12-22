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
onMounted(() => {
  if (rive.value) {
    rive.value.play("Hands_up");
  }
});
</script>
<template>
  <div>
    <ClientOnly>
      <Rive
        id="rive"
        ref="riveComp"
        :rive-params="riveParams"
        :options="options"
        @click="clickHandler"
        @rive-is-loaded="riveHandler"
      />
    </ClientOnly>
    <button @click="outsideClick">
      outsideClick Button
    </button>
  </div>
</template>
