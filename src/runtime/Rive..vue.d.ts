import { Rive, type RiveParameters } from '@rive-app/webgl';

export type UseRiveParameters = Partial<Omit<RiveParameters, 'canvas'>> | null;

export type UseRiveOptions = {
  useDevicePixelRatio: boolean;
  fitCanvasToArtboardHeight: boolean;
  useOffscreenRenderer: boolean;
};

export type Dimensions = {
  width: number;
  height: number;
};


const _default: typeof import('@rive-app/webgl')['Rive'];
export default _default;