import {
  defineNuxtModule,
  createResolver,
  addComponent,
  addImportsDir,
  addImports,
} from "@nuxt/kit";
import { addCustomTab } from "@nuxt/devtools-kit";

// Module options TypeScript interface definition
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions { }

export type * from './runtime/types/index'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-rive",
    configKey: "nuxtRive",
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);



    addComponent({
      name: "Rive",
      filePath: resolver.resolve("./runtime/NuxtRive.client.vue"),
    });

    // Add imports
    addImports([
    ]);

    addImportsDir(resolver.resolve("runtime/composables"));

    addCustomTab({
      name: "rive",
      title: "Nuxt Rive",
      icon: "simple-icons:rive",
      view: {
        type: "iframe",
        src: "https://github.com/mrnasil/nuxt-rive?tab=readme-ov-file",
      },
    });
  },
});
