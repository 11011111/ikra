<script setup>
import {abbreviateNumber} from "src/common/utils"

const props = defineProps({
  name: String,
  image: String,
  amount: Number,
  modelValue: Boolean
})
</script>

<template lang="pug">
q-dialog(
  :model-value="modelValue"
  position="bottom"
)
  q-card.full-width.modern-dialog.q-py-sm.q-px-md
    q-card-section.q-pb-lg
      .row.justify-center.column.text-center
        img.ava(:src="image")
        p {{ name }}
        .amount.q-mt-md.flex.justify-center.items-center
          p.text-bold +{{ abbreviateNumber(amount) }}
          img.ikra.q-ml-xs(src="/ikra.svg")
    .q-px-lg.q-pb-lg.flex.justify-center
      q-btn.button-text.btn-style.q-mx-lg.bg-liDark.full-width(
        label="Задание не выполнено"
        text-color="white"
        @click="$emit('update:modelValue', false)"
        size="14px"
        unelevated
        no-caps
      )
</template>

<style scoped lang="scss">
.modern-dialog {
  background: $dark;
  border-radius: 15px 15px 0 0;
  padding: 15px 30px 30px;
}
.ava {
  width: 60px;
  border-radius: 50%;
  margin: 5px auto 20px;
}
.amount {
  background: $light-dark;
  padding: 8px 10px;
  border-radius: 20px;
  width: auto;
  margin: 0 auto;

  p {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
  }
  .ikra{
    width: 18px;

  }
}
.btn-style {
  border-radius: 10px;
}
</style>
