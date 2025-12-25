<script setup lang="ts">
defineOptions({ name: 'IndexPage' })

const { data: page } = await useAsyncData('index', () => queryCollection('docs').path('/').first())

const title = page.value?.seo?.title || page.value?.title || 'Nuxt Rive'
const description = page.value?.seo?.description || page.value?.description || ''

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
  <div v-else>
    <h1>Page not found</h1>
    <p>Please check your content/index.md file.</p>
  </div>
</template>
