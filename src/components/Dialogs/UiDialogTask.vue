<script setup>
import {ref} from "vue"
import {useQuasar} from "quasar"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
const {me} = storeToRefs(profileState())

const props = defineProps({
  title: String,
  subTitle: String,
  smile: String,
  link: String,
  modelValue: Boolean
})


const isCheckCopyLink = ref(false)
const $q = useQuasar()

const handleCopyLink = () => {
  isCheckCopyLink.value = true
  $q.notify({
    message: 'Ссылка скопирована',
    color: 'primary',
    timeout: 500
  })
}

const shareLink = link => Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${link}`)
</script>

<template lang="pug">
q-dialog(
  :model-value="modelValue"
  position="bottom"
)
  q-card.full-width.modern-dialog.q-py-sm.no-padding
    q-card-section.q-pb-lg
      .row.justify-end.no-wrap.mb--20
        q-icon.q-pa-xs.text-dark(name="mdi-close-circle-outline" size="30px" @click="$emit('update:modelValue', false)" )
      .row.justify-center.column.text-center
        .ava
          p {{ smile }}
        .title
          p.no-margin {{ title }}
        p {{ subTitle }}
        //.amount.q-mt-md.flex.justify-center.items-center

    .q-px-lg.q-pb-md.flex.justify-between.grid-fr
      q-btn.button-text.btn-style.q-mx-lg.bg-tg.full-width.q-py-sm(
        icon="img:/tg_logo.svg"
        label="Пригласить"
        @click="shareLink(me?.ref_link)"
        text-color="white"
        size="14px"
        unelevated
        no-caps
      )
      q-btn.button-text.btn-style.q-mx-lg.full-width.q-py-sm(
        :class="isCheckCopyLink ? 'bg-dark' : 'bg-tg'"
        :icon="isCheckCopyLink ? 'mdi-check' :'mdi-link-variant'"
        @click="handleCopyLink"
        text-color="white"
        size="14px"
        unelevated
        no-caps
      )
    .row.justify-center.q-px-lg.q-pb-lg
      q-btn.button-text.btn-style.q-mx-lg.bg-dark.full-width.q-py-sm(
        label="Проверить"
        text-color="white"
        size="14px"
        unelevated
        no-caps
      )
</template>

<style scoped lang="scss">
.modern-dialog {
  background: $dark-second;
  border-radius: 15px 15px 0 0;
  padding: 15px 30px 30px;
}
.ava {

  border-radius: 50%;
  padding: 20px;
  margin: 0 auto 20px;
  background: $dark;

  p {
    font-size: 50px;
    line-height: 50px;
    margin: 0;
  }
}
.amount {
  background: $light-dark;
  padding: 8px 10px;
  border-radius: 20px;
  width: auto;
  margin: 0 auto;

  p {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
  }
  .ikra{
    width: 18px;

  }
}
.btn-style {
  border-radius: 10px;
}
.mb--20 {
  margin-bottom: -30px;
}

.title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
}
.grid-fr {
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 10px;
}
</style>
