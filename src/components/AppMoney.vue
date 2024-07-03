<script setup>
import {computed} from "vue";
import {abbreviateNumber} from "src/common/utils";

const props = defineProps({
  modelValue: Number
})


const balanceImg = computed(() => {
  let urlPath = 'wallet-0.svg'

  if  (props.modelValue >= 100) {
    urlPath = 'banka100.svg'
  }

  if  (props.modelValue >= 1000) {
    urlPath = 'banka1000.svg'
  }

  if  (props.modelValue >= 10000) {
    urlPath = 'banka10000.svg'
  }

  if  (props.modelValue >= 500000) {
    urlPath = 'banka-full.svg'
  }
  return urlPath
})

const balance = computed(() => {
  return abbreviateNumber(props.modelValue)
})
</script>

<template lang="pug">
.energy.column.text-center.z-index-priority.relative-position
  .block-element.shadow-orange.row.justify-between.items-center
    img(:src="`/${balanceImg}`")
    .l1-text.q-px-sm {{ balance }}

  .title.q-mt-sm
    .l1-text Икра
</template>

<style scoped lang="scss">

</style>
