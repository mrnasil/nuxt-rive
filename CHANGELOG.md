# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
## v1.0.8

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.7...v1.0.8)

## v1.0.7

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.6...v1.0.7)

## v1.0.6

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.5...v1.0.6)

## v1.0.5

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.4...v1.0.5)

## v1.0.4

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.3...v1.0.4)

## v1.0.3

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.2...v1.0.3)

### 🏡 Chore

- **release:** V1.0.2 ([6c1e3f0](https://github.com/mrnasil/nuxt-rive/commit/6c1e3f0))
- **package.json:** Update repository field to include type and url for better clarity and compatibility ([4b4a892](https://github.com/mrnasil/nuxt-rive/commit/4b4a892))

### ❤️ Contributors

- Mrnasil ([@mrnasil](http://github.com/mrnasil))

## v1.0.2

[compare changes](https://github.com/mrnasil/nuxt-rive/compare/v1.0.1...v1.0.2)

### 📖 Documentation

- **README.md:** Update README with information about the Rive integration in Nuxt application ([4c42375](https://github.com/mrnasil/nuxt-rive/commit/4c42375))
- **README.md:** Update links formatting for Release Notes, Online playground, and Documentation sections to improve readability and consistency ([bf2745e](https://github.com/mrnasil/nuxt-rive/commit/bf2745e))
- **README.md:** Remove commented out template code and update README with correct image link and formatting ([87d06b6](https://github.com/mrnasil/nuxt-rive/commit/87d06b6))

### 🏡 Chore

- **.eslintignore): update ignore patterns to exclude additional directories and files 🔧 chore(.npmrc): add new line at the end of the file 🔧 chore(build.config.ts): add build configuration file to disable treeshaking and handle a specific issue with unbuild 🔥 refactor(playground/app.config.ts): remove unused app configuration file 🔧 chore(playground/nuxt.config.ts): comment out devtools option in nuxt configuration 🔧 chore(playground/package.json): remove unused dependency and devDependency 🔧 chore(playground/pages/index.vue): remove unused class from div element 🔥 refactor(playground/tailwind.config.ts): remove unused tailwind configuration file 🔧 chore(pnpm-workspace.yaml:** Add pnpm workspace configuration file to include additional packages in the workspace ([ee975a7](https://github.com/mrnasil/nuxt-rive/commit/ee975a7))
- **NuxtRive.client.vue:** Remove unnecessary import statement and add newline at the end of the file for consistency ([707f798](https://github.com/mrnasil/nuxt-rive/commit/707f798))

### 🎨 Styles

- **README.md:** Update image link in the README to display the correct image ([24cfd61](https://github.com/mrnasil/nuxt-rive/commit/24cfd61))

### ❤️ Contributors

- Mrnasil ([@mrnasil](http://github.com/mrnasil))

## v1.0.1


### 🩹 Fixes

- **useStateMachineInput.ts): export StateMachineInput type from '@rive-app/webgl' to fix import error in index.vue 🔧 fix(index.vue): update import path for StateMachineInput type to fix import error 🔧 fix(module.ts): add import for addImportsDir from '@nuxt/kit' to fix missing import error 🔧 fix(Rive.client.vue): update import path for types to fix import error ✨ feat(composables/useStateMachineInput.ts): add useStateMachineInput composable to fetch stateMachine input from a rive file 🔧 chore(types/index.ts:** Add types for UseRiveParameters, UseRiveOptions, and Dimensions to improve type safety ([d70b63c](https://github.com/mrnasil/nuxt-rive/commit/d70b63c))
- **index.vue): comment out unused imports and variables to improve code readability and maintainability 🔧 fix(index.vue): update useStateMachineInput function call to use rive instead of rive.value to fix runtime error 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue): update clickHandler function to remove unused agreeInput variable 🔧 fix(index.vue:** Update clickHandler function to remove unused agreeInput variable ([4313b9b](https://github.com/mrnasil/nuxt-rive/commit/4313b9b))

### 💅 Refactors

- **index.vue:** Remove unused import of StateMachineInput from '../composables/useStateMachineInput' to improve code cleanliness and reduce potential confusion ([2cf35b3](https://github.com/mrnasil/nuxt-rive/commit/2cf35b3))
- **module.ts:** Comment out unused code to improve code readability and maintainability ([804922d](https://github.com/mrnasil/nuxt-rive/commit/804922d))

### 📖 Documentation

- **README.md:** Update module name from "My Module" to "Nuxt-Rive" for clarity and consistency ([534ab92](https://github.com/mrnasil/nuxt-rive/commit/534ab92))
- **CHANGELOG.md:** Add initial changelog file to document notable changes in the project ([9cf4584](https://github.com/mrnasil/nuxt-rive/commit/9cf4584))
- **README.md:** Update online playground link to point to the correct URL ([ff6896f](https://github.com/mrnasil/nuxt-rive/commit/ff6896f))
- **README.md): update package name from 'my-module' to 'nuxt-rive' for consistency and clarity 📝 docs(README.md): update package name in installation instructions to 'nuxt-rive' to reflect the correct package name 📝 docs(README.md): update module name in 'modules' section of 'nuxt.config.ts' to 'nuxt-rive' for accurate configuration 📝 docs(README.md): update npm badge URLs to point to 'nuxt-rive' package instead of 'my-module' for correct information 📝 docs(README.md:** Update license badge URLs to point to 'nuxt-rive' package instead of 'my-module' for accurate licensing information ([0a243bf](https://github.com/mrnasil/nuxt-rive/commit/0a243bf))

### 🏡 Chore

- **.release-it.json): add release-it configuration file to enable automated releases with conventional commit messages 📝 docs(.vscode/snippet.code-snippets): add code snippets for Vue 3 and Nuxt 3 development 📦 chore(package.json): add dependencies for @rive-app/webgl and @vueuse/core 🔨 refactor(playground/app.vue): update app.vue to use NuxtLayout and NuxtPage components ✨ feat(playground/pages/index.vue): add index.vue page with Rive component and its parameters 🔨 refactor(src/module.ts): update module.ts to add Rive component and import necessary files 📝 docs(src/runtime/Rive..vue.d.ts): add type definitions for Rive component 📝 docs(src/runtime/Rive.client.vue): add Rive client component with props definition 📝 docs(src/runtime/Rive.server.vue): add Rive server component 📝 docs(src/runtime/plugin.ts:** Update plugin.ts to reflect module name change ([6bc3d2f](https://github.com/mrnasil/nuxt-rive/commit/6bc3d2f))
- **package.json:** Add @nuxt/ui as a dependency to support UI components in the project ([7ca7f6e](https://github.com/mrnasil/nuxt-rive/commit/7ca7f6e))
- **useStateMachineInput.ts:** Comment out console.log statement for better code readability and remove unnecessary log statements ([5678967](https://github.com/mrnasil/nuxt-rive/commit/5678967))
- **package.json:** Update package name, description, and repository URL ([91252a9](https://github.com/mrnasil/nuxt-rive/commit/91252a9))
- **app.vue:** Add script setup tag with lang="ts" to enable TypeScript support in the Vue component ([1266f4d](https://github.com/mrnasil/nuxt-rive/commit/1266f4d))
- **tsconfig.json): update tsconfig.json to fix path for extending tsconfig file ✨ feat(module.ts:** Add custom tab for Nuxt Rive in devtools with name, title, icon, and view configuration ([251a92d](https://github.com/mrnasil/nuxt-rive/commit/251a92d))
- **package.json): add release-it package as a dev dependency to enable automated releases 📦 chore(package.json:** Update vitest package version to ^1.2.2 for compatibility ([2fce6fb](https://github.com/mrnasil/nuxt-rive/commit/2fce6fb))
- **package.json): add stackblitz start command to simplify running the app on StackBlitz 🚀 feat(package.json:** Update dependencies to latest versions for @nuxt/kit and @rive-app/webgl ([e29985c](https://github.com/mrnasil/nuxt-rive/commit/e29985c))

### ❤️ Contributors

- Mrnasil ([@mrnasil](http://github.com/mrnasil))

