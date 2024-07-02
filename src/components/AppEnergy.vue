<script setup>
const props = defineProps({
  modelValue: Number
})
</script>

<template lang="pug">
.energy.column.text-center
  q-linear-progress.block-element.shadow-orange.row.justify-between.items-center.z-index-priority.relative-position(rounded size="48px" color="primary" :value="modelValue / 100" )
    img.z-ind(src="~/src/assets/energy.svg")
    .l1-text.q-px-sm.z-ind.text-white {{ modelValue }}%

  .title.q-mt-sm
    .l1-text Энергия
</template>

<style scoped lang="scss">
.z-ind {
  z-index: 99999;
}
</style>
