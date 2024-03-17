import { defineNuxtModule, createResolver, addComponent, addImportsDir } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'

// Module options TypeScript interface definition
export interface ModuleOptions {

}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-rive',
    configKey: 'nuxtRive'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))

    addComponent({
      name: 'Rive',
      filePath: resolver.resolve('./runtime/NuxtRive.client.vue'),
    })



    addImportsDir(resolver.resolve('runtime/composables'))


    addCustomTab({
      name: 'rive',
      title: 'Nuxt Rive',
      icon: 'simple-icons:rive',
      view: {
        type: 'iframe',
        src: 'https://github.com/mrnasil/nuxt-rive?tab=readme-ov-file'
      }
    })
  
  


  } 



})
