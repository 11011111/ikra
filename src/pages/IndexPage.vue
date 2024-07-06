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

const goTasks = () => {
  // router.push({name: links.EXCHANGE.name})
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
      AppClicker(v-if="!action")
      AppTgPostCustom(v-model="actionPost" v-if="action" )
      Particles(id="tsparticles")
    .footer.z-isndex-priority.relative-position
      .row.justify-between.items-center.wrap(v-if="!action")
        .block-element-footer.column.row.justify-between.items-center(@click="goTOP")
          .text-icon 🥇
          .l1-text.q-px-sm TOP 100
        .block-element-footer.column.row.justify-between.items-center.tasks-elem(@click="goTasks")
          .notification
            .text 0
          .text-icon 👆
          .l1-text.q-px-sm Tasks
        .block-element-footer.column.row.justify-between.items-center(@click="goExchange")
          .text-icon 🎁
          .l1-text.q-px-sm Exchange

</template>

<style scoped lang="scss">
.tasks-elem {
  position: relative;

  .notification {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    .text {
      font-size: 10px;
      color: white;
      padding: 0 8px;
    }
  }

  .l1-text {
    color: rgba(255, 255, 255, 0.2);
  }


  &.active {
    .notification {
      background: rgba(255, 122, 0, 1);

    }

    .l1-text {
      color: rgba(255, 255, 255, 1);
    }
  }
}

</style>
