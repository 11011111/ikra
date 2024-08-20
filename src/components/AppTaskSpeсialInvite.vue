<script setup>
import {abbreviateNumber} from "src/common/utils"
import {computed, ref} from "vue"
import {storeToRefs} from "pinia"
import {profileState} from "stores/profile"
import {api} from "boot/axios";
import {apiLinks} from "src/common/routerLinks";
const {referralsCount, tasks} = storeToRefs(profileState())

const props = defineProps({
  id: Number,
  name: String,
  amount: Number,
  success: Boolean,
  link: String,
  countTask: Number,
  idx: Number,
})

const isLoaderCheckStatus = ref(false)

const refCount = computed(() => {
  return referralsCount.value
})

const checkStatus = () => {
  isLoaderCheckStatus.value = true
  api
    .post(apiLinks.TASKS.retrieve(props.id))
    .then(r => {
      tasks.value = r.data.items
    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => {
      setTimeout(() => isLoaderCheckStatus.value = false, 500)
    })
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
          div
            .balance-text(v-if="!isLoaderCheckStatus")
              div.q-ml-sm · выполнено {{ refCount }}/3
            .balance-text(v-if="isLoaderCheckStatus")
              q-spinner-ios.q-ml-sm.text-center(color="primary")

  .btn-block
    q-btn.full-width(
      v-if="!success"
      label="Проверить"
      size="12px"
      color="dark"
      @click="checkStatus"
      rounded
      no-caps
    )
    q-btn.full-width(
      v-if="success"
      label="Готово"
      icon-right="check"
      size="12px"
      color="positive"
      rounded
      no-caps
    )
.hr(v-if="countTask !== idx")
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
  }

  .text-data {
    .task-name {
      font-size: 12px;
      line-height: 14px;
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
