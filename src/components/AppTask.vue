<script setup>
import {abbreviateNumber} from "src/common/utils"
import {ref} from "vue"

const props = defineProps({
  id: Number,
  name: String,
  amount: Number,
  image: String,
  success: Boolean,
  link: String,
  countTask: Number,
  idx: Number,
})

const emit = defineEmits(['checkStatus'])
const status = ref(false)

const changeStatus = (id) => {
  if (status.value) {
    emit('checkStatus', id)
  }
  else {
    status.value = true
  }
}
</script>

<template lang="pug">
.row.justify-between.task-block.full-width.items-center.no-wrap
    .row.items-center
      .task-data.row.no-wrap.justify-between.items-center
        .image-block
          img.image(:src="image")
        .text-data.row.column.q-ml-md.items-start.justify-start
          .task-name {{ name }}
          .row.justify-start.q-mt-xs.items-center
            .balance-text +{{ abbreviateNumber(amount) }}
            .image-ikra.q-ml-xs.flex.items-center
              img(src="/ikra.svg")
            //.image-ikra.q-ml-xs
            //  img(src="/ikra.svg")

    .btn-block
      q-btn.full-width(
        v-if="!success && !status"
        label="Подписаться"
        size="12px"
        color="dark"
        :href="`https://t.me/${link}`"
        target="_blank"
        @click="changeStatus(id)"
        rounded
        no-caps
      )
      q-btn.full-width(
        v-if="!success && status"
        label="Проверить"
        size="12px"
        color="primary"
        @click="changeStatus(id)"
        rounded
        no-caps
      )
      q-icon(
        v-if="success"
        name="mdi-checkbox-marked"
        color="positive"
        size="22px"
      )
.hr(v-if="countTask !== idx")
</template>

<style scoped lang="scss">
.hr {
  background: rgba(255, 255, 255, 20%);
  height: 1px;
  width: 100%;

}
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
</style>
