<script setup>
import AppHeaderBlock from "components/AppHeaderBlock.vue"
import AppTask from "components/AppTask.vue"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {onMounted, ref} from "vue"
import {api} from "boot/axios"
import {apiLinks} from "src/common/routerLinks"


const {tasks} = storeToRefs(profileState())
const {getTasks} = profileState()
const done = ref(false)

onMounted(async () => {
  await getTasks()
    .then(r => {
      done.value = true
    })
})

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
.justify-between.column
  AppHeaderBlock.z-index-priority.relative-position(
    img="👆"
    title="Задания"
    text="Выполняй задания и получай еще больше икринок"
  )

  .row.q-mt-md.rating-block.column
    .row.justify-center( v-if="!done" )
      q-spinner-ios(color="primary" size="56px")
    AppTask(
      v-if="done"
      v-for="(task, idx) in tasks"
      :key="idx"
      :name="task.name"
      :amount="task.amount"
      :image="task.image"
      :success="task.success"
      :limit="task.limit"
      :link="task.link"
      :id="task.id"
      @check-status="checkStatus"
    )
</template>

<style scoped lang="scss">
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
  margin: 20px auto;
}
</style>
