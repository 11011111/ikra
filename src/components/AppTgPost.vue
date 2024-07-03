<script setup>
import {onActivated, onMounted, ref} from "vue"
import ikra from 'src/assets/ikra.svg'
import ikrax3 from 'src/assets/ikrax3.svg'
import {tapRequest} from "src/common/requests"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {useRouter} from "vue-router";
import {links} from "src/common/routerLinks";
import {tgUrlToCode} from "src/common/utils";
import {WidgetPost} from "televue";


const {energy, balance, action, actionPostUrl} = storeToRefs(profileState())
const btnParty = ref(null)
const telegramWidget = ref(null)
const tgPost = ref(null)
const ikraImg = ikra
const ikrax3Img = ikrax3
const router = useRouter()
const done = ref(false)

const props = defineProps({
  postUrl: {
    type: String,
    default: '1',
  }
})


onMounted(() => {
  tgPost.value.addEventListener("click", () => {
    confetti("tsparticles", {
      spread: 360,
      ticks: 100,
      gravity: -3,
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
          {
            src: ikrax3Img,
            width: 32,
            height: 32,
          },
        ],
      },
    });
  });


  const script = document.createElement('script')
  script.async = true;
  script.src = 'https://mail.ru'
  // script.setAttribute('data-telegram-post', 'sale_caviar/' + props.postUrl)
  // script.setAttribute('data-telegram-post', 'sale_caviar/8102')
  // script.setAttribute('data-width', '100%')


  setTimeout(() => {
    // telegramWidget.value.append(script)
    done.value = true;
  }, 4000)

})



// const onResize = (size) => {
//   tgPost.value.style.height = size.height + 'px'
// }

const tapPostFn = async () => {
  await tapRequest({method: 'post'})
    .then(r => {
      energy.value = r.data.energy
      balance.value = r.data.balance
      action.value = Boolean(r.data.action_post)
      actionPostUrl.value = tgUrlToCode(r.data.action_post || '')
      // if (action.value) {
      //   router.push({ name: links.CLICKER_POST.name })
      // } else {
      //   router.push({ name: links.CLICKER.name })
      // }
    })
    .catch(e => {
      console.log(e)
    })
}


// setTimeout(() => {
//   const frame = document.getElementsByTagName('iframe')
//   if (frame[0].offsetHeight >= 1050) {
//     const heightFrame = frame[0].offsetHeight + 110 + 'px'
//     frame[0].setAttribute('style', 'height:' + heightFrame)
//   } else {
//     const heightFrame = frame[0].offsetHeight + 50 + 'px'
//     frame[0].setAttribute('style', 'height:' + heightFrame)
//   }
// }, 1200)

// Сохранение оригинальной функции window.open
var originalWindowOpen = window.open;

// Переопределение функции window.open
window.open = function(url, name, features) {
  var currentDomain = window.location.hostname;

  // Создаем элемент для парсинга URL
  var parser = document.createElement('a');
  parser.href = url;

  // Проверяем, является ли URL внешним
  if (parser.hostname !== currentDomain) {
    alert('Переход на внешние ресурсы запрещен.');
    return null; // Отменяем открытие нового окна
  } else {
    return originalWindowOpen.call(window, url, name, features);
  }
};

// Переопределение window.location
Object.defineProperty(window, 'location', {
  set: function(url) {
    var currentDomain = window.location.hostname;

    // Создаем элемент для парсинга URL
    var parser = document.createElement('a');
    parser.href = url;

    // Проверяем, является ли URL внешним
    if (parser.hostname !== currentDomain) {
      alert('Переход на внешние ресурсы запрещен.');
    } else {
      window.location.href = url;
    }
  },
  get: function() {
    return window.location;
  }
});



</script>

<template lang="pug">
.row.justify-center(v-if="!done")
  q-spinner-ios(color="primary" size="56px" )
.button(v-show="done" ref="btnParty" :class="energy ? 'active' : ''")
  div.tg-post(ref="tgPost" @click="tapPostFn" :class="energy ? 'active' : ''")
  WidgetPost(:post="`sale_caviar/${props.postUrl}`")
  //div.widget(ref="telegramWidget")
    //q-resize-observer(@resize="onResize")
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
  border-radius: 16px;
  cursor: pointer;
  margin: 40px auto 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255, 171, 73, 0.5) 0%, rgba(255, 145, 70, 0.5) 39%, rgba(255, 114, 47, 0.5) 71%, rgba(255, 114, 47, 0.5) 100%);

  &:active {
    background: linear-gradient(180deg, rgba(255, 171, 73, 1) 0%, rgba(255, 145, 70, 1) 39%, rgba(255, 114, 47, 1) 71%, rgba(255, 81, 0, 1) 100%);
  }

  &.active {
    -webkit-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    -moz-box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
    box-shadow: 0px 0px 28px 10px rgba(255, 139, 76, 0.48);
  }
}

.widget {
  width: 100%;
  padding: 12px;

  iframe {
    font-size: 10px !important;
    height: 1400px !important;
    padding: 2px 8px !important;
    border-radius: 16px !important;
  }
}
</style>

<style lang="scss">

</style>
