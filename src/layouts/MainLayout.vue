<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {onBeforeMount, onMounted, watch} from 'vue'
import { profileState } from 'stores/profile'
import { useRoute, useRouter } from 'vue-router'
import {storeToRefs} from "pinia";

const {balance, energy} = storeToRefs(profileState())
const { openWebApp, getStatus, logout } = profileState()
logout()

const tg = window.Telegram.WebApp // init TelegramWebApp
tg.disableClosingConfirmation()
const route = useRoute()
const router = useRouter()

const backBtnRouteNameList = ['/', '/onboarding']

// Вернуться на страницу "назад"
tg.BackButton.onClick(() => {
  window.location = '/'
  // router.back()
})

onBeforeMount(async () => {
  await getStatus()
  if (localStorage.getItem('balance') && localStorage.getItem('energy')) {
    energy.value = JSON.parse(localStorage.getItem('energy'))
    balance.value =JSON.parse(localStorage.getItem('balance'))
  }

  openWebApp(tg.initData) // Иначе - проходим авторизацию
})

onMounted(() => {
  if (backBtnRouteNameList.includes(route.path)) {
    tg.BackButton.hide()
  } else {
    tg.BackButton.show()
  }
})

watch(
  () => route.path,
  async () => {
    if (backBtnRouteNameList.includes(route.path)) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
    }
  }
)

</script>
