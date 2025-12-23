export type { Rive, StateMachineInput } from '@rive-app/webgl'
export type UseRiveParameters = Partial<{
  src: string
  artboard?: string
  animations?: string[]
  stateMachines?: string[]
  autoplay?: boolean
  fit?: 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown'
  alignment?: 'center' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
}> | null

export type UseRiveOptions = {
  useDevicePixelRatio: boolean
  fitCanvasToArtboardHeight: boolean
  useOffscreenRenderer: boolean
}

export type Dimensions = {
  width: number
  height: number
}
