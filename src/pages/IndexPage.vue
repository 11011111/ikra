<script setup>
import AppEnergy from "components/AppEnergy.vue"
import AppAction from "components/AppAction.vue"
import AppMoney from "components/AppMoney.vue"
import AppClicker from "components/AppClicker.vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile"
import AppTgPostCustom from "components/AppTgPostCustom.vue";
import {useRoute, useRouter} from "vue-router";
import {links} from "src/common/routerLinks";
import {computed} from "vue";


const  {energy, balance, action, actionPost, tasks} = storeToRefs(profileState())
const router = useRouter()
const route = useRoute()

// console.log(route.path)


const goTOP = () => router.push({name: links.TOP.name})
const goExchange = () => router.push({name: links.EXCHANGE.name})
const goTasks = () => router.push({name: links.TASKS.name})


const tasksSuccess = computed(() => {
  let list = []
  tasks.value.map(el => {
    if (!el.success) list.push(el)
  })

  return list
})

document.addEventListener('touchmove', function(event) {
  // Проверяем направление свайпа
  if (route.path === '/') {
    if (event.touches[0].clientY < startY && !action.value) {
      event.preventDefault();  // Блокируем свайп вниз
    }
  }
}, { passive: false })

let startY = 0;
document.addEventListener('touchstart', function(event) {
  if (route.path === '/') {
    startY = event.touches[0].clientY;
  }
}, { passive: false })

</script>

<template lang="pug">
//.flex.column.no-wrap.text-center.q-pa-lg.content-between.justify-between
.qwe.q-pa-lg
  //.state
  .row.justify-between.items-center
    AppEnergy(v-model="energy")
    AppAction(v-model="action")
    AppMoney(v-model="balance")

  .clicker(:style="action ? 'align-items: start;' : 'align-items: center;'")
    AppClicker(v-if="!action")
    AppTgPostCustom(v-model="actionPost" v-if="action" )
    Particles(id="tsparticles")

  .footer.z-isndex-priority.fixed-bottom.q-ma-lg
    .row.justify-between.items-center.wrap(v-if="!action")
      .block-element-footer.column.row.justify-between.items-center(@click="goTOP")
        .text-icon 🥇
        .l1-text.q-px-sm Рейтинг

      .block-element-footer.column.row.justify-between.items-center.tasks-elem.active(@click="goTasks")
        .notification
          .text {{ tasksSuccess?.length }}
        .text-icon 👆
        .l1-text.q-px-sm Задания

      .block-element-footer.column.row.justify-between.items-center(@click="goExchange")
        .text-icon 🎁
        .l1-text.q-px-sm Призы

</template>

<style scoped lang="scss">
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
<style lang="scss">
body{
  background-image: url("/src/assets/bg-ellipse.svg");
  background-position: top center;
  background-repeat: no-repeat;
  width: 100%;
  //height: 100vh;

  background-size: contain;
}

.qwe {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.clicker{
  flex: 1;
  display: flex;
}
</style>
