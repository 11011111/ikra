<template>
  <router-view />
</template>

<script setup>
const tg = window.Telegram?.WebApp // init TelegramWebApp
tg.expand() //full screen
</script>
