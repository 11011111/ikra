<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppClicker from "components/AppClicker.vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile"
import AppTgPostCustom from "components/AppTgPostCustom.vue";
import {useRouter} from "vue-router";
import {links} from "src/common/routerLinks";


const  {energy, balance, action, actionPost} = storeToRefs(profileState())
const router = useRouter()


const goTOP = () => {
  router.push({name: links.TOP.name})
}

const goExchange = () => {
  router.push({name: links.EXCHANGE.name})
}
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
      //AppClicker(v-if="!action")
      AppClicker
      //AppTgPostCustom(v-model="actionPost" v-if="action" )
      Particles(id="tsparticles")
    .footer.z-isndex-priority.relative-position
      .row.justify-between.items-center(v-if="!action")
        .block-element-footer.column.row.justify-between.items-center(@click="goTOP")
          .text-icon 🥇
          .l1-text.q-px-sm TOP 100
        .block-element-footer.column.row.justify-between.items-center(@click="goExchange")
          .text-icon 🎁
          .l1-text.q-px-sm Exchange

</template>
