<script setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: Boolean
})

const active = computed(() => {
  let imgName = 'action.svg'

  if (props.modelValue) imgName = 'action-active.svg'

  return imgName
})
</script>

<template lang="pug">
.energy.column.text-center.z-index-priority.relative-position
  img.height-style(:src="`/${active}`")

  .title
    .l1-text Акция

</template>

<style scoped lang="scss">
.height-style {
  height: 75px;
  margin-top: -14px;
  margin-bottom: -7px;
}
</style>
