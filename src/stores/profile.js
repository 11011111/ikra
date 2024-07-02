import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {authRequest, meRequest, onboardingRequest, statusRequest, tapRequest} from 'src/common/requests'
import { links } from 'src/common/routerLinks'

export const profileState = defineStore('profileState', () => {
  const me = ref()
  const calledPath = ref(null)
  const router = useRouter()
  const error = ref(null)
  const tg = window.Telegram.WebApp
  const onboardingList = ref([])
  const balance = ref(0)
  const energy = ref(0)
  const action = ref(false)


  // Start
  const openWebApp = (initData) => {
    // console.log(initData)
    initData ? login(initData) : login(process.env.DEFAULT_DATA || '')
  }

  //Add token
  const storeTokens = (token) => localStorage.setItem('access', token)

  //logout
  const logout = () => localStorage.removeItem('access')

  //Auth
  async function login(iditData) {
    await authRequest({ query: iditData })
      .then((r) => {
        storeTokens(r.data.token) // write token
        // tg.platform === 'unknown' // check platform for Web or TgApp
        //   ? console.log(r.data.token)
        //   : tg.showAlert(r.data.token)
        getMe()
      })
      .catch((err) => console.log(err))
  }

  //Get Slides Onboarding
  async function getOnboardingSlides() {
    await onboardingRequest()
      .then((r) => {
        onboardingList.value = r.data.items
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function getMe() {
    await meRequest()
      .then((r) => {
        me.value = r.data.user
        balance.value = r.data.user.balance
        energy.value = r.data.user.energy
        checkOnboarding(r.data.user.skip_onboarding)
      })
      .catch((e) => console.log(e))
  }

  // Если Onboarding пройден - редирект в приложения, иначе на Onboarding
  async function checkOnboarding(skip_onboarding) {
    if (skip_onboarding) {
      await router.push({ name: links.CLICKER.name })
    } else {
      await router.push({ name: links.ONBOARDING.name })
    }
  }

  async function getStatus() {
    statusRequest()
      .then(r => {
      balance.value = r.data.user.balance
      energy.value = r.data.user.energy
      action.value = Boolean(r.data.user.action_post)
    })
      .catch((e) => console.log(e))
  }

  setInterval(getStatus, 6000);



  return {
    me,
    calledPath,
    error,
    onboardingList,
    balance,
    energy,
    action,

    login,
    storeTokens,
    logout,
    openWebApp,
    getOnboardingSlides,
    getMe,
    checkOnboarding
  }
})
