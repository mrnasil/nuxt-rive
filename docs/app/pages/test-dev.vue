<script setup>
import assetRivImport from '../../assets/test-asset.riv'

const publicPath = '/test.riv'
</script>

<template>
  <div class="p-10 space-y-10 bg-slate-900 text-white">
    <section>
      <h2>1. Public Path String ('/test.riv')</h2>
      <div class="h-64 border border-green-500">
        <ClientOnly>
          <NuxtRive :rive-params="{ src: publicPath, autoplay: true }" />
        </ClientOnly>
      </div>
    </section>

    <section>
      <h2>3. Asset Import (import x from '~/assets...')</h2>
      <p>This import should now work correctly and return a URL.</p>
      <div class="h-64 border border-blue-500">
        <ClientOnly>
          <NuxtRive :rive-params="{ src: assetRivImport, autoplay: true }" />
        </ClientOnly>
      </div>
      <div class="mt-2 text-sm text-gray-400">
        Resolved URL: {{ assetRivImport }}
      </div>
    </section>
  </div>
</template>
