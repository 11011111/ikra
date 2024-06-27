<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue";
import AppMoney from "components/AppMoney.vue";
import AppTgPost from "components/AppTgPost.vue";
// import AppClicker from "components/AppClicker.vue";
</script>

<template lang="pug">
.custom-page
q-card.flex.column.no-wrap.text-center.q-pa-lg.content-between(style="height:100vh")

  .state
    .row.justify-between.items-center
      AppEnergy
      AppAction
      AppMoney

  .clicker
    //AppClicker
    AppTgPost
  .footer.z-index-priority.relative-position
    .row.justify-between.items-center
      .block-element-footer.column.row.justify-between.items-center
        .text-icon 🥇
        .l1-text.q-px-sm TOP 100
      .block-element-footer.column.row.justify-between.items-center
        .text-icon 🎁
        .l1-text.q-px-sm Exchange

</template>
