<script setup>
import {abbreviateNumber} from "src/common/utils"
import UiDialogTask from "components/Dialogs/UiDialogTask.vue"
import {computed, ref} from "vue"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
const {referralsCount, refLink} = storeToRefs(profileState())

const props = defineProps({
  id: Number,
  name: String,
  amount: Number,
  success: Boolean,
  link: String,
  countTask: Number,
  idx: Number,
})
// const emit = defineEmits(['showShareDialog'])

const isDialog = ref(false)

const showShareDialog = () => {
  isDialog.value = true
}

const refCount = computed(() => {
  return 3 - referralsCount.value
})

const linkInvite = computed(() => {
  return refLink.value
})


const handlerShare = () => {
  showShareDialog()
}
</script>

<template lang="pug">
.row.justify-between.task-block.full-width.items-center.no-wrap
  .row.items-center
    .task-data.row.no-wrap.justify-between.items-center
      .ava
        p 🧸
      .text-data.row.column.items-start.justify-start.q-ml-sm
        .task-name {{ name }}
        .row.justify-start.q-mt-xs.items-center
          .balance-text +{{ abbreviateNumber(amount) }}
          .image-ikra.q-ml-xs.flex.items-center
            img(src="/ikra.svg")

  .btn-block
    q-btn.full-width(
      label="Отправить"
      size="12px"
      color="dark"
      target="_blank"
      @click="handlerShare"
      rounded
      no-caps
    )
.hr(v-if="countTask !== idx")

UiDialogTask(
  title="Пригласи 3-х друзей"
  :sub-title="`Осталось ${refCount}/3`"
  :success="referralsCount === 3"
  smile="🧸"
  :id="id"
  :link="linkInvite"
  v-model="isDialog"
)
</template>

<style scoped lang="scss">

.task-block {
  padding: 10px 0;
}
.task-data {
  .image {
    width: 40px;
    border-radius: 50%;
    img{
      width: 100%;
    }
    //.img-avatar{
    //  background: #0d47a1;
    //  color: white;
    //  font-size: 14px;
    //}
  }

  .text-data {
    .task-name {
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      text-wrap: wrap;
      padding-right: 10px;
    }

    .balance-text {
      font-size: 12px;
      font-weight: 500;
      color: #fff;
    }
    .image-ikra {
      width: 14px;

      img {
        width: 100%;
      }
    }
  }
}

.image-block {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: v-bind(randBackground);
  position: relative;

  .word-avatar {
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding: 8px;
    position: absolute;
    width: 100%;
  }

  .image {
    position: absolute;
  }
}
.btn-block{
  min-width: 112px;
  display: flex;
  justify-content: end;
}
:deep(.q-btn .q-icon, .q-btn .q-spinner) {
  font-size: 14px !important;
}

.ava {

  border-radius: 50%;
  padding: 10px;
  margin: 0 auto;
  background: $dark;

  p {
    font-size: 18px;
    line-height: 21px;
    margin: 0;
  }
}
</style>
