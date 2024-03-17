//@ts-ignore
import { defineNuxtPlugin } from "#app";

import useStateMachineInput from "./composables/useStateMachineInput";

export default defineNuxtPlugin(() => {
  useStateMachineInput;
  console.log("Plugin injected by nuxt-rive!");
});
