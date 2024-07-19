<script setup>
import AppHeaderBlock from "components/AppHeaderBlock.vue"
import AppUserTop from "components/AppUserTop.vue"
import {onMounted, ref} from "vue"
import {storeToRefs} from "pinia";
import {profileState} from "stores/profile";

const {userTOP} = storeToRefs(profileState())
const {getTopUsers, getMe} = profileState()
const done = ref(false)

onMounted(async () => {
  await getTopUsers()
    .then(r => {
      done.value = true
    })
})


</script>

<template lang="pug">
.custom-page
.row.justify-start
  AppHeaderBlock.z-index-priority.relative-position(
    img="🥇"
    title="Рейтинг"
    text="Здесь собраны самые активные юзеры, которые поборятся за главный приз в конце розыгрыша"
  )

  .row.q-mt-md.rating-block.column
    .row.justify-center( v-if="!done" )
      q-spinner-ios(color="primary" size="56px")
    AppUserTop(
      v-if="done"
      v-for="(user, idx) in userTOP"
      :key="idx"
      :first-name="user.first_name"
      :last-name="user.last_name"
      :image="user.image"
      :balance="user.balance"
      :idx="idx + 1"
    )
</template>

<style scoped lang="scss">
.custom-page{
  top: 0 !important;
}

.rating-block {
  background: rgba(255, 255, 255, 5%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(5.9px);
  padding: 20px 30px;
  width: 90%;
  margin: 20px auto;
}
</style>
