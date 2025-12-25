<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
  [key: string]: unknown
}

interface PageLink {
  icon?: string
  label: string
  to: string
  target?: string
  [key: string]: unknown
}

interface PageData {
  title: string
  description?: string
  seo?: {
    title?: string
    description?: string
  }
  path: string
  stem?: string
  extension?: string
  links?: PageLink[]
  body?: {
    toc?: {
      links: TocLink[]
    }
  }
  toc?: {
    depth?: number
  }
  [key: string]: unknown
}

interface CustomAppConfig {
  toc?: {
    title?: string
    bottom?: {
      title?: string
      edit?: string
      links?: PageLink[]
    }
  }
}

defineOptions({ name: 'SlugPage' })

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { toc } = useAppConfig() as unknown as CustomAppConfig
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first() as Promise<unknown> as Promise<PageData>)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImageComponent('Docs', {
  headline: headline.value,
})

const links = computed(() => {
  const links = []
  if (toc?.bottom?.edit) {
    links.push({
      icon: 'i-lucide-external-link',
      label: 'Edit this page',
      to: `${toc.bottom.edit}/${page?.value?.stem}.${page?.value?.extension}`,
      target: '_blank',
    })
  }

  return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})

const tocLinks = computed(() => {
  const links = page.value?.body?.toc?.links || []
  const depth = page.value?.toc?.depth ?? (page.value?.path === '/changelog' ? 2 : undefined)

  if (depth && depth <= 2) {
    return links.map((link: TocLink) => ({ ...link, children: undefined }))
  }

  return links
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    >
      <template #links>
        <UButton
          v-for="(link, index) in page.links"
          :key="index"
          v-bind="link"
        />

        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="tocLinks"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
