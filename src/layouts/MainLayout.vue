<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, watch } from 'vue'
import { profileState } from 'stores/profile'
import { useRoute, useRouter } from 'vue-router'

const { openWebApp } = profileState()
const tg = window.Telegram.WebApp // init TelegramWebApp
Telegram.WebApp.disableClosingConfirmation()
const route = useRoute()
const router = useRouter()

const backBtnRouteNameList = ['clicker', 'onboarding']

// Вернуться на страницу "назад"
tg.BackButton.onClick(() => {
  router.back()
})

onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
})

watch(
  () => route.name,
  async () => {
    if (backBtnRouteNameList.includes(route.name)) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
    }
  }
)
</script>
