<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {onBeforeMount, watch} from 'vue'
import { profileState } from 'stores/profile'
import { useRoute, useRouter } from 'vue-router'

const { openWebApp } = profileState()
const tg = window.Telegram.WebApp // init TelegramWebApp
tg.disableClosingConfirmation()
const route = useRoute()
const router = useRouter()

const backBtnRouteNameList = ['/', '/onboarding']

// Вернуться на страницу "назад"
tg.BackButton.onClick(() => {
  window.location = '/'
})

onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
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

// document.addEventListener('touchmove', function(event) {
//   // Проверяем направление свайпа
//   if (event.touches[0].clientY < startY) {
//     event.preventDefault();  // Блокируем свайп вниз
//   }
// }, { passive: false });
//
// let startY = 0;
// document.addEventListener('touchstart', function(event) {
//   startY = event.touches[0].clientY;
// }, { passive: false });

</script>
