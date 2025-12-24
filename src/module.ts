import {
  defineNuxtModule,
  createResolver,
  addComponent,
  addImportsDir,
  addImports,
  addServerHandler,
  extendViteConfig,
} from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'

// Module options TypeScript interface definition
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions { }

export type * from './runtime/types/index'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-rive',
    configKey: 'nuxtRive',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'NuxtRive',
      filePath: resolver.resolve('./runtime/NuxtRive.client.vue'),
    })
    addComponent({
      name: 'Rive',
      filePath: resolver.resolve('./runtime/NuxtRive.client.vue'),
    })

    // Add imports
    addImports([
    ])

    addImportsDir(resolver.resolve('runtime/composables'))

    addServerHandler({
      route: '/_nuxt-rive/view',
      handler: resolver.resolve('./runtime/server/routes/view.get.ts'),
    })

    addServerHandler({
      route: '/_nuxt-rive/media',
      handler: resolver.resolve('./runtime/server/routes/media.get.ts'),
    })

    // Add Rive files to assets
    extendViteConfig((config) => {
      config.assetsInclude = config.assetsInclude || []
      if (Array.isArray(config.assetsInclude)) {
        config.assetsInclude.push('**/*.riv')
      }
      else {
        config.assetsInclude = [config.assetsInclude as string, '**/*.riv']
      }
    })

    addCustomTab({
      name: 'rive',
      title: 'Nuxt Rive',
      icon: 'simple-icons:rive',
      view: {
        type: 'iframe',
        src: '/_nuxt-rive/view',
      },
    })
  },
})
