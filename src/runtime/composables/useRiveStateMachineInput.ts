import type { Rive, StateMachineInput } from '@rive-app/webgl2'
import { unref, computed } from 'vue'
import type { MaybeRef } from 'vue'

export type { StateMachineInput } from '@rive-app/webgl2'

/**
 * Custom hook for fetching a stateMachine input from a rive file.
 *
 * @param rive - Rive instance or Ref to Rive instance
 * @param stateMachineName - Name of the state machine
 * @param inputName - Name of the input
 * @returns input - ComputedRef<StateMachineInput | null>
 */
export default function useRiveStateMachineInput(
  rive: MaybeRef<Rive | null>,
  stateMachineName?: MaybeRef<string>,
  inputName?: MaybeRef<string>,
) {
  return computed<StateMachineInput | null>(() => {
    const riveInstance = unref(rive)
    const smName = unref(stateMachineName)
    const iName = unref(inputName)

    if (!riveInstance || !smName || !iName) {
      return null
    }

    const inputs = riveInstance.stateMachineInputs(smName)
    if (inputs) {
      const selectedInput = inputs.find(input => input.name === iName)
      return selectedInput || null
    }

    return null
  })
}
