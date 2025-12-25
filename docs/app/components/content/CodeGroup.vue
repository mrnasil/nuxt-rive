<script setup lang="ts">
import { useSlots, computed } from 'vue'

const slots = useSlots()

const items = computed(() => {
  const defaultSlot = slots.default?.() || []
  // Filter out comments or text nodes if any, keep elements
  const tabs = defaultSlot.filter(node => node.type !== Symbol.for('v-cmt') && node.type !== Symbol.for('v-txt'))
  return tabs.map((vnode, index) => {
    const props = vnode.props || {}
    // MDC usually passes the filename as a prop to ProsePre, or we might need to look deeper
    // If it's a ProsePre component
    const label = props.filename || props.label || props.title || `Tab ${index + 1}`

    return {
      label,
      vnode,
      slot: 'tab',
    }
  })
})
</script>

<template>
  <UTabs
    :items="items"
    class="w-full"
  >
    <template #tab="{ item }">
      <component :is="item.vnode" />
    </template>
  </UTabs>
</template>
