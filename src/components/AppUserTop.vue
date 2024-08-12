<script setup>
import {abbreviateNumber} from "src/common/utils";
import {computed} from "vue";

const props = defineProps({
  image: String,
  firstName: String,
  lastName: String,
  balance: Number,
  idx: Number,
  countUsers: Number,
})


const balanceImg = computed(() => {
  let urlPath = 'wallet-0.svg'
  let urlPath1th = 'present_icons/1-th.png'
  let urlPath2th = 'present_icons/2-th.png'
  let urlPath3th = 'present_icons/3-th.png'
  let urlPathTgPrem = 'present_icons/tg-premium.png'

  if (props.idx === 1) {
    urlPath = urlPath1th
  }
  else if (props.idx === 2){
    urlPath = urlPath2th
  }

  else if (props.idx === 3){
    urlPath = urlPath3th
  }

  else if (props.idx >= 4 && props.idx <= 10){
    urlPath = urlPathTgPrem
  }

  else {

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

  }
  return urlPath
})

const backgroundList = ['#ff7900', '#b143eb', '#43a2eb', '#30bcac', '#eb43bc']

const randBackground = computed(() => {
  const randomIndex = Math.floor(Math.random() * backgroundList.length)
  return backgroundList[randomIndex]
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
.hr(v-if="countUsers !== idx")
</template>

<style scoped lang="scss">
.user-block {
  //border-bottom: 1px solid rgba(255, 255, 255, 20%);
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
    max-width: 120px;
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

.banka {
  width: 40px;
  text-align: center;
}
</style>
