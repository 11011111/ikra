<script setup>
import ikra from 'src/assets/ikra.svg'
import {onMounted, ref} from "vue"
import {tapRequest} from "src/common/requests"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {useRouter} from "vue-router";

const {energy, balance, action, actionPost, unixTime} = storeToRefs(profileState())
const btnParty = ref(null)
const telegramWidget = ref(null)
const tgPost = ref(null)
const router = useRouter()

onMounted(() => {
  btnParty.value.addEventListener("click", () => {
    if (energy.value) {
      confetti("tsparticles", {
        spread: 180,
        ticks: 100,
        gravity: -20,
        decay: 0.90,
        startVelocity: 10,
        particleCount: 5,
        scalar: 3,
        zIndex: 0,

        rotate: {
          value: 0, // отключить вращение
          animation: {
            enable: true, // отключить анимацию вращения
            speed: 0,
            sync: false,
          },
          direction: "clockwise", // отключить направление вращения
          path: true, // отключить вращение по пути
        },
        tilt: {
          enable: false, // отключить наклон
          random: false,
          direction: "clockwise",
          value: 60,
          animation: {
            enable: false, // отключить анимацию наклона
            speed: 0,
            sync: false,
            value: 0,
          },
        },
        wobble: {
          enable: false, // отключить качание
          distance: 0,
          speed: 0,
        },
        shapes: ["image"],
        shapeOptions: {
          image: [{
            src: ikraImg,
            width: 32,
            height: 32,
          },
          ],
        },
      })
    }
  })

})
const tg = window.Telegram.WebApp // init TelegramWebApp
const tapBankaFn = () => {
  if (energy.value) {
    tg.HapticFeedback.impactOccurred('rigid'); // Вибрация на клик
    tapRequest({method: 'post'})
      .then(r => {
        energy.value = r.data.energy
        balance.value = r.data.balance
        action.value = Boolean(r.data.action_post)
        actionPost.value = r.data.action_post || {}
        unixTime.value = r.data?.action_post?.remaining_time
      })
      .catch(e => {
        console.log(e)
      })
  }
}
let ikraImg = ikra


</script>

<template lang="pug">
  .button(ref="btnParty" :class="energy ? 'active' : ''")
    .block(@click="tapBankaFn" :class="energy ? 'active' : ''")
</template>

<style scoped lang="scss">
.tg-post {
  position: absolute;
  width: 100%;
  background-color: transparent;
  z-index: 9999999999999;
  overflow: auto;
}

.tgme_widget_message_text {
  font-size: 10px !important;
}


.button {
  //position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 auto ;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg,
    rgba(255, 171, 73, 0.8) 0%,
    rgba(255, 145, 70, 0.8) 39%,
    rgba(255, 114, 47, 0.8) 71%,
    rgba(255, 81, 0, 0.8) 100%);
  align-content: space-around;
  align-items: center;
  padding: 8px;

  &.active:active {
    background: linear-gradient(180deg,
      rgba(255, 171, 73, 1) 0%,
      rgba(255, 145, 70, 1) 39%,
      rgba(255, 114, 47, 1) 71%,
      rgba(255, 81, 0, 1) 100%);
  }

  &.active {
    -webkit-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    -moz-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
  }

  .block {
    position: relative;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background: url("/src/assets/ikra.jpg") no-repeat center center;
    background-size: cover;

    &.active {
      z-index: 99999;
    }
  }
}
</style>
