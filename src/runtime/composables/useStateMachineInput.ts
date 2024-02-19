import { Rive, StateMachineInput } from '@rive-app/webgl';

/**
 * Custom hook for fetching a stateMachine input from a rive file.
 *
 * @param rive - Rive instance
 * @param stateMachineName - Name of the state machine
 * @param inputName - Name of the input
 * @returns input - StateMachineInput
 */
export default function useStateMachineInput(
  rive: Rive | null,
  stateMachineName?: string,
  inputName?: string
) {
  let input: StateMachineInput | null = null;
  // console.log('useStateMachineInput: ', stateMachineName, inputName, rive);

  if (!rive || !stateMachineName || !inputName) {
    input = null;
  }

  if (rive && stateMachineName && inputName) {
    const inputs = rive.stateMachineInputs(stateMachineName);
    if (inputs) {
      const selectedInput = inputs.find((input) => input.name === inputName);
      input = selectedInput || null;
    }
  } else {
    input = null;
  }

  return input;
}