<script setup>
import {onMounted, ref} from "vue"
import ikra from "assets/ikra.svg"
import ikrax3 from "assets/ikrax3.svg"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {tapRequest} from "src/common/requests";

const {energy, balance, action, actionPost} = storeToRefs(profileState())

const tg = window.Telegram.WebApp // init TelegramWebApp


const props = defineProps({
  modelValue: Object
})
const tgPost = ref(null)
const ikraImg = ikra
const ikrax3Img = ikrax3

onMounted(() => {
    tgPost.value.addEventListener("click", () => {
      confetti("tsparticles", {
        spread: 80,
        ticks: 100,
        gravity: -45,
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
            {
              src: ikrax3Img,
              width: 32,
              height: 32,
            },
          ],
        },
      })
    })
})

const tapPostFn = () => {
  tg.HapticFeedback.impactOccurred('heavy'); // Вибрация на клик

  tapRequest({method: 'post'})
    .then(r => {
      energy.value = r.data.energy
      balance.value = r.data.balance
      action.value = Boolean(r.data.action_post)
      actionPost.value = r.data.action_post || {}
    })
    .catch(e => {
      console.log(e)
    })
}

</script>

<template lang="pug">
  .button(:class="energy ? 'active' : ''" @click="tapPostFn")
    .tg-post(ref="tgPost")
      .header-post
        .row.justify-between
          .title-name.row.justify-start.items-center
            span кабачковая икра по акции
            img(src="~/src/assets/verifited-tg.png")
          img(src="~/src/assets/tg-logo.png")

      .preview-post
        img(:src="modelValue.images[0]")

      .content-post
        //.title-articles {{ modelValue.text }}
        .text-articles.q-mt-md(v-html="modelValue.text")

      .footer-post
        .row.justify-end.items-center
          .views
            span 40.4К
            img(src="~/src/assets/views.svg")

          .edited
            span edited

          .date-post
            span Jun 17 at 21:03
</template>

<style scoped lang="scss">
.button {
  //position: absolute;
  border-radius: 16px;
  cursor: pointer;
  margin: 40px auto;
  max-width: 90%;
  padding: 10px 9px;
  background: linear-gradient(180deg,
    rgba(255, 171, 73, 0.8) 0%,
    rgba(255, 145, 70, 0.8) 39%,
    rgba(255, 114, 47, 0.8) 71%,
    rgba(255, 81, 0, 0.8) 100%);

  &:active {
    background: linear-gradient(180deg, rgba(255, 171, 73, 1) 0%, rgba(255, 145, 70, 1) 39%, rgba(255, 114, 47, 1) 71%, rgba(255, 81, 0, 1) 100%);
  }

  &.active {
    -webkit-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    -moz-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
  }

  .tg-post {
    border-radius: 16px;
    //border: 8px solid rgba(255, 142, 9, 0.65);
    z-index: 99999;
    position: relative;
    background-color: #fff;


    .header-post {
      background-color: #fff;
      border-radius: 8px 8px 0 0;
      padding: 3px 10px;

      img {
        width: 20px;
        height: 20px;
      }

      .title-name {
        span {
          color: $tg-color;
          font-weight: 600;
          display: block;
          margin-right: 5px;
        }
        img {
          width: 18px;
          height: 18px;
        }
      }

    }

    .preview-post {

      img {
        width: 100%;
      }
    }

    .footer-post {
      padding: 8px 10px;
      .views {
        span {
          color: $tg-footer-text;
          font-size: 12px;
          font-weight: 300;
          margin-left: 10px;
        }
        img {
          width: 15px;
          margin-left: 3px;
        }
      }

      .edited {
        color: $tg-footer-text;
        font-size: 12px;
        font-weight: 300;
        margin-left: 10px;
      }

      .date-post {
        color: $tg-footer-text;
        font-size: 12px;
        font-weight: 300;
        margin-left: 10px;
      }
    }
  }



  //.tg-post:active {
  //  border: 8px solid rgb(255, 142, 7);
  //}
}
</style>

<style lang="scss">
.content-post {
  color: #000;
  font-size: 14px;
  text-align: left;
  padding: 5px 10px;

  .title-articles {
    font-weight: 600;
    line-height: 17px;
  }
  .text-articles {
    font-weight: 500;
    line-height: 16px;
    a {
      color: #049BE5FF !important;
    }
  }
}
</style>
