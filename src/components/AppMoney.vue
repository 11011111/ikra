<script setup>
import {computed} from "vue";

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

// Преобразовать окончание
const abbreviateNumber = value => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return value.toString();
  }
}
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
