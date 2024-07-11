<script setup>
import {abbreviateNumber} from "src/common/utils";
import {computed} from "vue";

const props = defineProps({
  image: String,
  firstName: String,
  lastName: String,
  balance: Number,
  idx: Number,
})


const balanceImg = computed(() => {
  let urlPath = 'wallet-0.svg'

  if  (props.balance >= 100) {
    urlPath = 'banka100.svg'
  }

  if  (props.balance >= 1000) {
    urlPath = 'banka1000.svg'
  }

  if  (props.balance >= 10000) {
    urlPath = 'banka10000.svg'
  }

  if  (props.balance >= 500000) {
    urlPath = 'banka-full.svg'
  }
  return urlPath
})
</script>

<template lang="pug">
.row.justify-between.user-block.full-width.items-center
  .row.items-center
    .number {{ idx }}
    .user-data.row.justify-between.q-ml-md.items-center
      .image-block
        .word-avatar {{firstName.charAt(0).toUpperCase()}}{{lastName.charAt(0).toUpperCase()}}
        img.image(:src="image")
      .text-data.row.column.q-ml-sm.items-start.justify-start
        .full-name {{ firstName }} {{ lastName }}
        .row.justify-start.q-mt-xs
          .balance-text {{ abbreviateNumber(balance) }}
          .image-ikra.q-ml-xs
            img(src="/ikra.svg")
  .banka
    img(:src="balanceImg")
</template>

<style scoped lang="scss">
.user-block {
  border-bottom: 1px solid rgba(255, 255, 255, 20%);
  padding: 10px 0;
}
.number {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,142,0, 50%);
}

.user-data {
  .image {
    width: 40px;
    height: 40px;
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
    .full-name {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }

    .balance-text {
      font-size: 12px;
      font-weight: 600;
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
  background: #ff7900;
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
</style>
