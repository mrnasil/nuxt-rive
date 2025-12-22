import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

const config = await createConfigForNuxt({
    ignores: [
        "dist",
        "node_modules",
        ".nuxt",
        ".vscode",
        "playground/.nuxt",
        "playground/node_modules",
        "playground/dist",
        "playground/.env",
        "playground/.output"
    ]
})

export default [
    ...config,
    {
        rules: {
            "vue/multi-word-component-names": "off",
            "@typescript-eslint/no-explicit-any": "off"
        }
    }
]
