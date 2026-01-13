// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NuxtRive from '../src/runtime/NuxtRive.client.vue'
import { Rive } from '@rive-app/webgl2'

vi.mock('@rive-app/webgl2', () => {
  const instance = {
    on: vi.fn((event, cb) => {
      // Execute callback immediately for load event to simulate loaded state
      if (event === 'load' && typeof cb === 'function') {
        cb()
      }
    }),
    play: vi.fn(),
    pause: vi.fn(),
    stop: vi.fn(),
    cleanup: vi.fn(),
    resizeToCanvas: vi.fn(),
    startRendering: vi.fn(),
    stopRendering: vi.fn(),
    setTextRunValue: vi.fn(),
    bounds: { maxY: 100, maxX: 100 },
    animationNames: ['Animation 1'],
  }

  const RiveMock = vi.fn(function () {
    return instance
  })
  // Attach instance to the constructor to access it in tests
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(RiveMock as any).__instance = instance

  return {
    Rive: RiveMock,
    EventType: {
      Load: 'load',
      Play: 'play',
      Pause: 'pause',
      Stop: 'stop',
      Loop: 'loop',
      StateChange: 'statechange',
    },
  }
})

describe('NuxtRive Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (Rive as any).__instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(instance).forEach((prop: any) => {
      if (prop && prop.mockClear) {
        prop.mockClear()
      }
    })
  })

  it('initializes Rive with correct parameters', async () => {
    await mount(NuxtRive, {
      props: {
        riveParams: {
          src: '/test.riv',
          autoplay: true,
        },
      },
    })

    // Wait for internal nextTick/mounting
    await nextTick()

    expect(Rive).toHaveBeenCalled()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callArgs = (Rive as any).mock.calls[0][0]
    expect(callArgs.src).toBe('/test.riv')
    expect(callArgs.autoplay).toBe(true)
    expect(callArgs.canvas).toBeDefined()

    // Verify on('load') was called
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (Rive as any).__instance
    expect(instance.on).toHaveBeenCalled()
  })

  it('cleans up on unmount', async () => {
    const wrapper = await mount(NuxtRive, {
      props: {
        riveParams: {
          src: 'test.riv',
        },
      },
    })

    await nextTick()

    wrapper.unmount()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (Rive as any).__instance
    expect(instance.stopRendering).toHaveBeenCalled()
    expect(instance.cleanup).toHaveBeenCalled()
  })

  it('updates animations when prop changes', async () => {
    const wrapper = await mount(NuxtRive, {
      props: {
        riveParams: {
          src: '/test.riv',
          animations: ['Idle'],
        },
      },
    })

    await nextTick()

    // Change animations prop
    await wrapper.setProps({
      riveParams: {
        src: '/test.riv',
        animations: ['Walk'],
      },
    })

    await nextTick()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (Rive as any).__instance
    expect(instance.stop).toHaveBeenCalled()
    expect(instance.play).toHaveBeenCalledWith(['Walk'])
  })

  it('updates textRuns when prop changes', async () => {
    const wrapper = await mount(NuxtRive, {
      props: {
        riveParams: {
          src: '/test.riv',
        },
        textRuns: {
          PlayerName: 'John',
        },
      },
    })

    await nextTick()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (Rive as any).__instance
    // Initial set
    expect(instance.setTextRunValue).toHaveBeenCalledWith('PlayerName', 'John')

    // Update prop
    await wrapper.setProps({
      textRuns: {
        PlayerName: 'Jane',
      },
    })

    await nextTick()

    expect(instance.setTextRunValue).toHaveBeenCalledWith('PlayerName', 'Jane')
  })
})
