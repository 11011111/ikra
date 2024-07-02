<script setup>
import ikra from 'src/assets/ikra.svg'
import {computed, onMounted, ref} from "vue"
import {tapRequest} from "src/common/requests"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"

const  {energy, balance} = storeToRefs(profileState())
const btnParty = ref(null)
let telegramWidget = ref(null)
let tgPost = ref(null)
onMounted(() => {
  if (energy.value) {
    btnParty.value.addEventListener("click", () => {
      confetti("tsparticles", {
        spread: 360,
        ticks: 100,
        gravity: -10,
        decay: 0.94,
        startVelocity: 30,
        particleCount: 20,
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
      });
    });
  }


  // const script = document.createElement('script');
  // script.async = true;
  // script.src = 'https://telegram.org/js/telegram-widget.js?22';
  // script.setAttribute('data-telegram-post', 'sale_caviar/8102');
  // script.setAttribute('data-width', '100:');
  // telegramWidget.value.appendChild(script);


  // console.log(telegramWidget.value.clientHeight, 12)
})


const onResize = (size) => {
  tgPost.value.style.height = size.height + 'px'
  telegramWidget.value.style.display = 'none'
}



let ikraImg = ikra
// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }


const tapBankaFn = () => {
  tapRequest({ method: 'post'})
    .then(r => {
      energy.value = r.data.energy
      balance.value = r.data.balance
  })
    .catch(e => {
      console.log(e)
    })
}

const activeClicker = computed(() => {
  console.log(energy.value)
  return energy.value
})

</script>

<template lang="pug">
.button(ref="btnParty" :class="activeClicker ? 'active' : ''")
  img.block(src="~/src/assets/banka.png" @click="tapBankaFn" :class="activeClicker ? 'active' : ''")
Particles(id="tsparticles")
//.button(ref="btnParty")
  //div.tg-post(ref="tgPost")
  //div(ref="telegramWidget")
  //  q-resize-observer(@resize="onResize")
//Particles(id="tsparticles")
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
  width: 280px;
  height: 280px;
  border-radius: 50%;
  cursor: pointer;
  margin: 40px auto 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255,171,73,0.5) 0%, rgba(255,145,70,0.5) 39%, rgba(255,114,47,0.5) 71%, rgba(255,114,47,0.5) 100%);

  &:active {
    background: linear-gradient(180deg, rgba(255,171,73,1) 0%, rgba(255,145,70,1) 39%, rgba(255,114,47,1) 71%, rgba(255,81,0,1) 100%);
  }
  &.active {
    -webkit-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    -moz-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
  }


  img {
    padding: 8px;
    position: relative;

    &.active {
      z-index: 99999;
    }
  }
  //
  //img:active,
  //img.active{
  //  border: 8px solid rgb(255, 142, 7);
  //}
}
</style>
