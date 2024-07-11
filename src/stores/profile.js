import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {authRequest, meRequest, onboardingRequest, statusRequest, tapRequest, top100Request} from 'src/common/requests'
import { links } from 'src/common/routerLinks'
import {tgUrlToCode} from "src/common/utils";

export const profileState = defineStore('profileState', () => {
  const me = ref()
  const calledPath = ref(null)
  const router = useRouter()
  const error = ref(null)
  const tg = window.Telegram.WebApp
  const onboardingList = ref([])
  const balance = ref(0 )
  const energy = ref(1)
  const action = ref(false)
  const actionPost = ref({})
  const userTOP = ref([])


  // Start
  const openWebApp = (initData) => {
    initData ? login(initData) : login(process.env.DEFAULT_DATA || '')
  }

  //Add token
  const storeTokens = async (token) => {
    localStorage.setItem('access', token)
  }

  //logout
  const logout = () => localStorage.removeItem('access')

  //Auth
  async function login(iditData) {
    console.log(iditData)
    logout()

    await authRequest({ query: iditData })
      .then((r) => {
        console.log('token')
        storeTokens(r.data.token) // write token
        // tg.platform === 'unknown' // check platform for Web or TgApp
        //   ? console.log(r.data.token)
        //   : tg.showAlert(r.data.token)

      })
      .then(r => {
        console.log('getMe')
        getMe()
      })
      .then(() =>{
        getStatus()
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
        localStorage.setItem('energy', JSON.stringify(r.data.energy))
        localStorage.setItem('balance', JSON.stringify(r.data.balance))
        checkOnboarding(r.data.user.skip_onboarding)
      })
      .catch((e) => console.log(e))
  }

  // Если Onboarding пройден - редирект в приложения, иначе на Onboarding
  async function checkOnboarding(skip_onboarding) {
    if (!skip_onboarding) {
      await router.push({ name: links.ONBOARDING.name })
    }
    // if (skip_onboarding) {
    //   await router.push({ name: links.CLICKER.name })
    // } else {
    //   await router.push({ name: links.ONBOARDING.name })
    // }
  }

  async function getStatus() {
    await statusRequest()
      .then(r => {
        balance.value = r.data.balance
        energy.value = r.data.energy
        action.value = Boolean(r.data.action_post)
        actionPost.value = r.data.action_post || {}

        localStorage.setItem('energy', JSON.stringify(r.data.energy))
        localStorage.setItem('balance', JSON.stringify(r.data.balance))
        // if (action.value) {
        //   router.push({ name: links.CLICKER_POST.name })
        // } else {
        //   router.push({ name: links.CLICKER.name })
        // }
      })
      .catch((e) => console.log(e))
  }

  // getStatus()
  setInterval(getStatus, 15000);

  async function getTopUsers() {
    await top100Request()
      .then(r => {
        userTOP.value = r.data.items
      })
      .catch(e => {
        console.log(e)
      })
  }


  return {
    me,
    calledPath,
    error,
    onboardingList,
    balance,
    energy,
    action,
    actionPost,
    userTOP,

    login,
    storeTokens,
    logout,
    openWebApp,
    getOnboardingSlides,
    getMe,
    checkOnboarding,
    getTopUsers,
    getStatus,
  }
})
