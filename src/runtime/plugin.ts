//@ts-ignore

import { defineNuxtPlugin } from "#imports";

import useStateMachineInput from "./composables/useStateMachineInput";

export default defineNuxtPlugin(() => {
  useStateMachineInput
  console.log("Plugin injected by nuxt-rive!");
});

declare module "#app" {
  interface RuntimeNuxtHooks {
    useStateMachineInput: typeof useStateMachineInput;
  }
}
