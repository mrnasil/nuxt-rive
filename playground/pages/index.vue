<script setup lang="ts">
// for testing purposes with auto-import disabled
// import { Rive } from '#components'
// import { Layout, Fit, Alignment } from '@rive-app/webgl';
import useStateMachineInput from '../composables/useStateMachineInput'


let rive = null
let disagreeInput: StateMachineInput | null = null;

const riveParams = {
  // src: 'https://public.rive.app/community/runtime-files/6198-12051-ori.riv',
  src: "https://cdn.rive.app/animations/vehicles.riv",
  autoplay: true,
  fit: 'contain',
  Alignment: 'center',
  isAnimationStateMachine: true,
  stateMachines: "bumpy",
  // artboard: 'New Artboard',
  // animations: ['idle'],
}

const options = {
  fitCanvasToArtboardHeight: false,
  useOffscreenRenderer: true,
}

const riveHandler = (riveInstance: any) => {
  rive = riveInstance;
  disagreeInput = useStateMachineInput(rive, 'default', 'disagree');
};

const clickHandler = () => {
  console.log('clickHandler');
  if (disagreeInput) {
    disagreeInput.fire();
  }
};


</script>
<template>
  <div
    id="canvasContainer"
    class="w-screen h-screen min-h-screen relative overflow-hidden"
  >
    <Rive
      id="rive"
      ref="riveComp"
      :rive-params="riveParams"
      :options="options"
      @click="clickHandler"
      @rive-is-loaded="riveHandler"
    />
  </div>
</template>