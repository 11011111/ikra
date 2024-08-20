<script setup>
import AppHeaderBlock from "components/AppHeaderBlock.vue"
import AppTask from "components/AppTask.vue"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {onMounted, ref} from "vue"
import {api} from "boot/axios"
import {apiLinks} from "src/common/routerLinks"
import AppTaskSpecialInvite from "components/AppTaskSpeсialInvite.vue"
import AppTaskSpecialReaction from "components/AppTaskSpecialReaction.vue"
import {copyToClipboard, useQuasar} from "quasar"
import AppTimer from "components/AppTimer.vue";


const {tasks, me, refLink} = storeToRefs(profileState())
const {getTasks} = profileState()
const done = ref(false)


onMounted(async () => {
  await getTasks()
    .then(r => {
      done.value = true
    })
})
const shareLink = link => Telegram.WebApp.openTelegramLink(`https://t.me/share/url?text=Тебе отсыпали кабачковой икры! +50 икринок тебе и +50 мне за приглос.%0A%0AЗаходи, это весело, а ещё мы разыгрываем iPhone 15 Pro Max и ещё тонну призов 👆&url=${link}`)

const isCheckCopyLink = ref(false)
const $q = useQuasar()

const handleCopyLink = () => {
  isCheckCopyLink.value = true
  copyToClipboard(`https://t.me/share/url?url=${refLink.value}`)
    .then(() => {
      $q.notify({
        message: 'Ссылка скопирована',
        color: 'primary',
        timeout: 500
      })
    })

}

const checkStatus = (id) => {
  api
    .post(apiLinks.TASKS.retrieve(id))
    .then(r => {
      tasks.value = r.data.items
    })
    .catch(e => {
      console.log(e)
      window.location.reload()
    })
}
</script>

<template lang="pug">
.justify-between.column.q-mt-sm
  AppHeaderBlock.z-index-priority.relative-position(
    img="👆"
    title="Задания"
    text="Выполняй задания и получай еще больше икринок"
  )

  .row.column.blur-block
    .row.no-wrap.justify-between
      span.text.text-left Получай икринки за каждого друга
      .row.no-wrap.justify-end.items-center
        span.text.text-left +50
        img(src="/ikra.svg" width="17px")

    .q-pt-md.flex.justify-between.grid-fr
      q-btn.button-text.btn-style.q-mx-lg.bg-dark.full-width.q-py-sm(
        icon="img:/tg_logo.svg"
        label="Пригласить"
        @click="shareLink(me?.ref_link)"
        text-color="white"
        size="14px"
        unelevated
        no-caps
      )
      q-btn.button-text.btn-style.q-mx-lg.full-width.q-py-sm.bg-dark(
        :icon="isCheckCopyLink ? 'mdi-check' :'mdi-link-variant'"
        @click="handleCopyLink"
        text-color="white"
        size="14px"
        unelevated
        no-caps
      )

  .row.rating-block.column
    .row.justify-center( v-if="!done" )
      q-spinner-ios(color="primary" size="56px")
    div(v-for="(task, idx) in tasks" :key="idx")
      AppTask(
        v-if="done && task.slug === 'subscribe'"
        :name="task.name"
        :amount="task.amount"
        :image="task.image"
        :success="task.success"
        :limit="task.limit"
        :link="task.link"
        :id="task.id"
        @check-status="checkStatus"
        :countTask="tasks.length"
        :idx="idx + 1"
      )
      AppTaskSpecialInvite(
        v-if="done && task.slug === 'invite'"
        :name="task.name"
        :amount="task.amount"
        :success="task.success"
        :link="task.link"
        :id="task.id"
        :countTask="tasks.length"
        :idx="idx + 1"
      )
      AppTaskSpecialReaction(
        v-if="done && task.slug === 'reaction' "
        :name="task.name"
        :amount="task.amount"
        :image="task.image"
        :success="task.success"
        :limit="task.limit"
        :link="task.link"
        :id="task.id"
        @check-status="checkStatus"
        :countTask="tasks.length"
        :idx="idx + 1"
      )
</template>

<style scoped lang="scss">
.blur-block {
  background: rgba(255, 255, 255, 5%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(5.9px);
  padding: 15px 20px;
  width: 90%;
  margin: 5px auto;
}
:deep(.q-page-container) {
  position: absolute;
  top: -140px;
  background-image: url("/src/assets/bg-ellipse.svg");
  background-position: top center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-size: contain;
}

.rating-block {
  background: rgba(255, 255, 255, 5%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(5.9px);
  padding: 20px 15px;
  width: 90%;
  margin: 5px auto;
}
.grid-fr {
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 10px;
}
.btn-style {
  border-radius: 10px;
  height: 44px;
}
</style>
<style lang="scss">
body{
  background-image: url("/src/assets/bg-ellipse.svg");
  background-position: top center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-size: contain;
}
</style>
