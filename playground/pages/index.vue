<script setup lang="ts">
let rive: any | null = ref(null);
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
  // animations: [
  //   "idle",
  //   "Hands_up",
  //   "hands_down",
  //   "success",
  //   "fail",
  //   "Look_down_right",
  //   "Look_down_left",
  //   "look_idle",
  // ],
};

const riveHandler = (riveInstance: any) => {
  rive = riveInstance;
  useStateMachineInput(rive, "Login Machine", "trigSuccess");
};

const clickHandler = () => {
  if (rive) {
    rive.play("hands_down");
    const trigSuccess: StateMachineInput | null = useStateMachineInput(
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
  if (rive) {
    rive.play("Hands_up");
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
    <button @click="outsideClick">outsideClick Button</button>
  </div>
</template>
