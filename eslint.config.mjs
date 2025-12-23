// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat' // Recommended for latest versions
// OR simply '@nuxt/eslint-config' in some versions

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
}, [])
