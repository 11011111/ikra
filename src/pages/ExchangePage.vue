<script setup>

import AppHeaderBlock from "components/AppHeaderBlock.vue";
</script>

<template lang="pug">
.custom-page
.justify-between.column(style="height: 100%")
  AppHeaderBlock.z-index-priority.relative-position(
    img="🎁"
    title="Exchange"
    text="Информация о розыгрышах призов"
  )

  img(src="/src/assets/iphone.png")
  //.row.q-mt-xs.rating-block.column.q-mx-lg
  //  .row.justify-center.blur-block.full-width
  //    .l1-text.text-center Скоро здесь появится информация про розыгрыш. Кто накопит больше всех икры — сможет ее выгодно обменять ;)

</template>

<style scoped lang="scss">
.blur-block {
  background: rgba(255, 255, 255, 5%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(5.9px);
  padding: 20px 30px;
  width: 90%;
  margin: 20px auto;
}
</style>
