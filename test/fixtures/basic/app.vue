<template>
  <div>
    <h1>Basic Rive Test</h1>
    <ClientOnly>
      <NuxtRive
        src="/test.riv"
        :width="500"
        :height="500"
        state-machines="State Machine 1"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
</script>
