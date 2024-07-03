<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppTgPost from "components/AppTgPost.vue"
import AppClicker from "components/AppClicker.vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile"
import {WidgetPost} from "televue";


const  {energy, balance, action, actionPostUrl} = storeToRefs(profileState())

</script>

<template lang="pug">
.custom-page
q-card.flex.column.no-wrap.text-center.q-pa-lg.content-between.justify-between(style="height:100vh")

  .state
    .row.justify-between.items-center
      AppEnergy(v-model="energy")
      AppAction(v-model="action")
      AppMoney(v-model="balance")

  //.timer

  .clicker
    WidgetPost(:post="`sale_caviar/8000`")
    //AppClicker(v-if="!action")
    //AppTgPost.q-mb-lg(:postUrl="actionPostUrl" v-if="action")
    //Particles(id="tsparticles")
  .footer.z-isndex-priority.relative-position
    .row.justify-between.items-center(v-if="!action")
      .block-element-footer.column.row.justify-between.items-center
        .text-icon 🥇
        .l1-text.q-px-sm TOP 100
      .block-element-footer.column.row.justify-between.items-center
        .text-icon 🎁
        .l1-text.q-px-sm Exchange

</template>
