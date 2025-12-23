export type { Rive, StateMachineInput } from '@rive-app/webgl';
export type UseRiveParameters = Partial<Omit<any, 'canvas'>> | null;

export type UseRiveOptions = {
  useDevicePixelRatio: boolean;
  fitCanvasToArtboardHeight: boolean;
  useOffscreenRenderer: boolean;
};

export type Dimensions = {
  width: number;
  height: number;
};