<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppTgPost from "components/AppTgPost.vue"
import AppClicker from "components/AppClicker.vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile";

const  {energy, balance, action, actionPost} = storeToRefs(profileState())
</script>

<template lang="pug">
  .custom-page
  q-card.flex.column.no-wrap.text-center.q-pa-lg.content-between.justify-start(style="height:100vh")

    .state
      .row.justify-between.items-center
        AppEnergy(v-model="energy")
        AppAction(v-model="action")
        AppMoney(v-model="balance")

    //.timer

    .clicker
      AppTgPost.q-mb-lg(:postUrl="actionPost")
      Particles(id="tsparticles")
</template>
