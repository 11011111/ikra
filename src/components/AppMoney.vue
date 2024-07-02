<script setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: Number
})


const balance = computed(() => {
  let urlPath = 'wallet-0.svg'

  if  (props.modelValue >= 100) {
    urlPath = 'banka100.svg'
  }

  return urlPath
})
</script>

<template lang="pug">
.energy.column.text-center.z-index-priority.relative-position
  .block-element.shadow-orange.row.justify-between.items-center
    img(:src="`~/src/assets/${balance}`")
    .l1-text.q-px-sm {{ modelValue }}

  .title.q-mt-sm
    .l1-text Икра
</template>

<style scoped lang="scss">

</style>
