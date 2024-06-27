import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingsState = defineStore('settingsState', () => {
  const errorDialogBottom = ref({
    error_title: 'Bad request',
    error_message: 'Sorry, QR code can’t be recognized, please try again',
    media: 'error_badRequest.svg',
    isShow: false
  })

  return {
    errorDialogBottom
  }
})
