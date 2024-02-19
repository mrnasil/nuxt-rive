import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

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
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))



    await Promise.all([
      addComponent({
        name: 'Rive',
        filePath: resolver.resolve('./runtime/Rive.client.vue'),
      }),
      addComponent({
        name: 'Rive',
        filePath: resolver.resolve('./runtime/Rive.server.vue'),
      }),


    ])
  


  },


  
})
