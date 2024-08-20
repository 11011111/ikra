<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppClicker from "components/AppClicker.vue"
import {ref, watch} from "vue"
import {useRouter} from "vue-router"
import {userRequest} from 'src/common/requests'
import AppTgPostCustom from "components/AppTgPostCustom.vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile";

const {action} = storeToRefs(profileState())

const stepOnboard = ref(0)
const router = useRouter()

const nextStep = () => {
  stepOnboard.value += 1
  if (stepOnboard.value >= 7) {
    userRequest({ method: 'patch', params: { skip_onboarding: true } })
      .then((r) => {
        window.location = '/'
      })
      .catch((e) => {
        console.log(e)
      })
  }

}

const erj = 100

const onboardingPost = ref({
  images: ["https://flexcoin.sgp1.cdn.digitaloceanspaces.com/tap_caviar/2024-07-03%2017.31.32.jpg"],
  text: "<div class=\"tgme_widget_message_text js-message_text\" dir=\"auto\">New York Times ищет «продюсера вертикальных видео» с зарплатой $85 тысяч в год или 7,4 млн рублей.<br><br>Российские сммщики, за 30 тысяч рублей совмещающие задачи редактора, рилсмейкера, монтажёра, сценариста и продюсера: </div>",
  remaining_time: generateUnixTime()
})


 function generateUnixTime() {

  // Получаем текущее время в миллисекундах
  const currentTimeMillis = Date.now()

// Добавляем 2 минуты (2 минуты = 120000 миллисекунд)
  const futureTimeMillis = currentTimeMillis + 50 * 1000

// Переводим миллисекунды в секунды и округляем до целого числа / возвращаем

   console.log(Math.floor(futureTimeMillis / 1000))
  return Math.floor(futureTimeMillis / 1000)
}


watch(stepOnboard, step => {
  action.value = step === 2
})
</script>

<template lang="pug">
.custom-page
.bg-blur-display
.bg-transparent-display(@click="nextStep")

// Подсказка 1
.step-warning-1.z-ind(:style="stepOnboard === 0 ? 'display: block' : 'display: none'")
  img.img-war-1(src="~/src/assets/arrow_line.svg")
  .block-text.war-1 По тапу на кнопку вы получаете игровую монету — икринки 🤑

// Подсказка 2
.step-warning-2.z-ind(:style="stepOnboard === 1 ? 'display: block' : 'display: none'")
  img.img-war-2(src="~/src/assets/arrow_line.svg")
  .block-text.war-2 Энергия полностью восстанавливается каждые 8 часов 20 минут, но можно тапать с любым количеством энергии ⚡

// Подсказка 3
.step-warning-3.z-ind(:style="stepOnboard === 2 ? 'display: block' : 'display: none'")
  img.img-war-3(src="~/src/assets/arrow_line.svg")
  .block-text.war-3 Это Акция, она действует при выходе новых постов на канале. С ней вы получаете х3 икринок по каждому тапу. Срок действия — 30 секунд ⏳

// Подсказка 4
.step-warning-4.z-ind(:style="stepOnboard === 3 ? 'display: block' : 'display: none'")
  img.img-war-4(src="~/src/assets/arrow_line.svg")
  .block-text.war-4 Здесь отображается количество заработанных икринок, в конце игры у кого будет больше, тот будет участвовать в розыгрыше призов 🎁

// Подсказка 5
.step-warning-5.z-ind(:style="stepOnboard === 4 ? 'display: block' : 'display: none'")
  img.img-war-5(src="~/src/assets/arrow_line.svg")
  .block-text.war-5 Следите за турнирной таблицей и попадайте в TOP 100 🏆

// Подсказка 6
.step-warning-6.z-ind(:style="stepOnboard === 5 ? 'display: block' : 'display: none'")
  img.img-war-6(src="~/src/assets/arrow_line.svg")
  .block-text.war-6 Тут будут появляться задания с дополнительными икринками 🟠


// Подсказка 7
.step-warning-7.z-ind(:style="stepOnboard === 6 ? 'display: block' : 'display: none'")
  img.img-war-7(src="~/src/assets/arrow_line.svg")
  .block-text.war-7 Вся информация об игре и конкурсах собрана тут 👇





q-card.flex.column.no-wrap.text-center.q-pa-lg.content-between.justify-between(style="height:100vh" )
  .state
    .row.justify-between.items-center
      AppEnergy(v-model="erj" :class="stepOnboard === 1 ? 'z-ind' : ''")
      AppAction(:class="stepOnboard === 2 ? 'z-ind' : ''" v-model="action" )
      AppMoney(:class="stepOnboard === 3 ? 'z-ind' : ''")

  .clicker(:class="stepOnboard === 0 ? 'z-ind' : ''")
    AppClicker(v-if="stepOnboard !== 2")
    AppTgPostCustom(v-model="onboardingPost" v-if="stepOnboard === 2" )
  .footer.relative-position
    .row.justify-between.items-center
      .block-element-footer.column.row.justify-between.items-center(:class="stepOnboard === 4 ? 'z-ind' : ''")
        .text-icon 🥇
        .l1-text.q-px-sm TOP 100

      .block-element-footer.column.row.justify-between.items-center.tasks-elem.active(:class="stepOnboard === 5 ? 'z-ind' : ''")
        .notification
          .text 5
        .text-icon 👆
        .l1-text.q-px-sm Задания

      .block-element-footer.column.row.justify-between.items-center(:class="stepOnboard === 6 ? 'z-ind' : ''")
        .text-icon 🎁
        .l1-text.q-px-sm Exchange

</template>

<style lang="scss">
.bg-blur-display {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 3000px rgba(0, 0, 0, 0.67);
  filter: blur(10px);
  z-index: 999999;
}

.bg-transparent-display {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999999999999;
}
.z-ind{
  z-index: 99999999 !important;
}



.step-warning-1 {
  position: absolute;
  top: 14%;
  right: 20px;

  .war-1 {
    width: 200px;
  }

  .img-war-1 {
    position: absolute;
    left: -70px;
    top: 40px;
    transform: rotate(339deg);
  }
}


.step-warning-2 {
  position: absolute;
  top: 130px;
  left: 40px;

  .war-2 {
    width: 289px;
  }

  .img-war-2 {
    position: absolute;
    left: 100px;
    top: -80px;
    transform: rotate(127deg);
  }
}


.step-warning-3 {
  position: absolute;
  top: 20%;
  left: 15%;

  .war-3 {
    width: 289px;
  }

  .img-war-3 {
    position: absolute;
    left: 180px;
    top: -90px;
    transform: rotate(127deg);
  }
}


.step-warning-4 {
  position: absolute;
  top: 20%;
  left: 11%;

  .war-4 {
    width: 289px;
  }

  .img-war-4 {
    position: absolute;
    left: 130px;
    top: -90px;
    transform: scaleX(-1) rotate(129deg);
  }
}


.step-warning-5 {
  position: absolute;
  bottom: 160px;
  left: 40px;

  .war-5 {
    width: 253px;
  }

  .img-war-5 {
    position: absolute;
    left: 160px;
    bottom: -90px;
    transform: scaleX(-1) rotate(300deg);
  }
}

.step-warning-6 {
  position: absolute;
  bottom: 140px;
  left: 30px;

  .war-6 {
    width: 260px;
  }

  .img-war-6 {
    position: absolute;
    left: 50px;
    bottom: -90px;
    transform: rotate(307deg);
  }
}


.step-warning-7 {
  position: absolute;
  bottom: 170px;
  right: 40px;

  .war-7 {
    width: 260px;
  }

  .img-war-7 {
    position: absolute;
    left: 100px;
    bottom: -90px;
    transform: rotate(307deg);
  }
}


.block-text {
  background: #292929;
  border: 1px solid $primary;
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
}

@media (min-height: 700px) {
  .step-warning-1 {
    top: 18%;
  }

  .step-warning-2 {
    top: 18%;
  }

  .step-warning-3 {
    top: 19%;
  }

  .step-warning-4 {
    top: 19%;
  }


}

@media (min-height: 750px) {
  .step-warning-1 {
    top: 19%;
  }

  .step-warning-2 {
    top: 17%;
  }

  .step-warning-3 {
    top: 17%;
  }

  .step-warning-4 {
    top: 17%;
    left: 19%;
  }
}

@media (min-height: 800px) {
  .step-warning-1 {
    top: 20%;
  }

  .step-warning-2 {
    top: 16%;
  }

  .step-warning-3 {
    top: 16%;
  }

  .step-warning-4 {
    top: 16%;
    left: 15%;
  }
}

@media (min-height: 850px) {
  .step-warning-1 {
    top: 21%;
  }

  .step-warning-2 {
    top: 15%;
  }

  .step-warning-3 {
    top: 15%;
  }

  .step-warning-4 {
    top: 15%;
    left: 16%;
  }
}

@media (min-height: 900px) {
  .step-warning-1 {
    top: 22%;
  }

  .step-warning-2 {
    top: 14%;
  }

  .step-warning-3 {
    top: 16%;
  }

  .step-warning-4 {
    top: 14%;
    left: 19%;
  }
}

@media (min-height: 950px) {
  .step-warning-1 {
    top: 23%;
  }

  .step-warning-2 {
    top: 13%;
  }

  .step-warning-3 {
    top: 15%;
  }

  .step-warning-4 {
    top: 19%;
  }
}

@media (min-height: 1000px) {
  .step-warning-1 {
    top: 24%;
  }

  .step-warning-2 {
    top: 12%;
  }

  .step-warning-3 {
    top: 14%;
  }

  .step-warning-4 {
    top: 13%;
    left: 19%;
  }
}

.tasks-elem {
  position: relative;

  .notification {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    .text {
      font-size: 10px;
      color: white;
      padding: 0 8px;
    }
  }

  .l1-text {
    color: rgba(255, 255, 255, 0.2);
  }


  &.active {
    .notification {
      background: rgba(255, 122, 0, 1);

    }

    .l1-text {
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
