<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppClicker from "components/AppClicker.vue"
import {ref} from "vue"
import {useRouter} from "vue-router"
import {links} from "src/common/routerLinks"
import {userRequest} from 'src/common/requests'

const stepOnboard = ref(0)
const router = useRouter()

const nextStep = () => {
  if (stepOnboard.value <= 4) {
    stepOnboard.value += 1
  } else {
    userRequest({ method: 'patch', params: { skip_onboarding: true } })
      .then((r) => {
        router.push({name: links.CLICKER.name})
      })
      .catch((e) => {
        console.log(e)
      })
  }

}
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
  .block-text.war-3 Это Акция, которая действует при выходе постов на канале. Когда она активна вы получаете х3 икринок по каждому тапу. Срок действия — 3 минуты ⏳

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
  .block-text.war-6 Вся информация об игре собрана тут 👇





q-card.flex.column.no-wrap.text-center.q-pa-lg.content-between.justify-between(style="height:100vh" )
  .state
    .row.justify-between.items-center
      AppEnergy(:class="stepOnboard === 1 ? 'z-ind' : ''")
      AppAction(:class="stepOnboard === 2 ? 'z-ind' : ''")
      AppMoney(:class="stepOnboard === 3 ? 'z-ind' : ''")

  .clicker(:class="stepOnboard === 0 ? 'z-ind' : ''")
    AppClicker
  .footer.relative-position
    .row.justify-between.items-center
      .block-element-footer.column.row.justify-between.items-center(:class="stepOnboard === 4 ? 'z-ind' : ''")
        .text-icon 🥇
        .l1-text.q-px-sm TOP 100
      .block-element-footer.column.row.justify-between.items-center(:class="stepOnboard === 5 ? 'z-ind' : ''")
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
  top: 130px;
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
  top: 150px;
  left: 40px;

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
  top: 140px;
  left: 40px;

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
  bottom: 170px;
  right: 40px;

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


.block-text {
  background: #292929;
  border: 1px solid $primary;
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
}
</style>
