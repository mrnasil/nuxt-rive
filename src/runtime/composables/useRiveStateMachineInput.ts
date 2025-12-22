import type { Rive, StateMachineInput } from '@rive-app/webgl';
import { unref } from 'vue';
import type { MaybeRef } from 'vue';

export type { StateMachineInput } from '@rive-app/webgl';

/**
 * Custom hook for fetching a stateMachine input from a rive file.
 *
 * @param rive - Rive instance or Ref to Rive instance
 * @param stateMachineName - Name of the state machine
 * @param inputName - Name of the input
 * @returns input - StateMachineInput
 */
export default function useRiveStateMachineInput(
  rive: MaybeRef<Rive | null>,
  stateMachineName?: string,
  inputName?: string
) {
  const riveInstance = unref(rive);
  let input: StateMachineInput | null = null;

  if (!riveInstance || !stateMachineName || !inputName) {
    return null;
  }

  const inputs = riveInstance.stateMachineInputs(stateMachineName);
  if (inputs) {
    const selectedInput = inputs.find((input) => input.name === inputName);
    input = selectedInput || null;
  }

  return input;
}