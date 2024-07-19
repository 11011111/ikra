<script setup>

import AppHeaderBlock from "components/AppHeaderBlock.vue";
</script>

<template lang="pug">
.custom-page
.justify-between.column(style="height: 100%")
  div
    AppHeaderBlock.z-index-priority.relative-position(
      img="🎁"
      title="Призы"
      text="Информация о розыгрышах призов"
    )
    .row.q-mt-xs.rating-block.column.q-mx-lg
      .row.justify-center.blur-block.full-width
        .l3-text.text-center.q-mb-sm Розыгрыш
        br
        .l2-text Каждые 10 дней мы награждаем победителей на основе рейтинга. Например, с 19 по 29 июля самый богатый тапатель икринок получит iPhone 15 Pro Max, а остальные участники топ-10 — Premium-подписку.
        br
        .l2-text После анонсирования победителей рейтинг всех участников обнуляется — и мы начинаем заново, но уже с другими призами.
        br
        em.l2-text Топ 100 игроков отображаются во вкладке «Рейтинг». Там вы можете увидеть своё место.
  div
   img(src="/iphone.png")

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
