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
  let urlPath = ''
  let urlPath1th = 'present_icons/1i-th.png'
  let urlPath2th = 'present_icons/2i-th.png'
  let urlPath3th = 'present_icons/3i-th.png'
  let urlPathTgPrem = 'present_icons/tg-premiumI.png'

  if (props.idx === 1) {
    urlPath = urlPath1th
  }

  if (props.idx === 2){
    urlPath = urlPath2th
  }

  if (props.idx === 3){
    urlPath = urlPath3th
  }

  if (props.idx >= 4 && props.idx <= 10){
    urlPath = urlPathTgPrem
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
.item-user
  .grid-item
    .number {{ idx }}
  .grid-item
    .user-data
      .image-block
        .word-avatar {{firstName.charAt(0).toUpperCase()}}{{lastName.charAt(0).toUpperCase()}}
        img.image(:src="image")

  .grid-item
    .user-data
      .text-data
        .full-name {{ firstName }} {{ lastName }}
        .row.justify-start.no-wrap
          .balance-text {{ abbreviateNumber(balance) }}
          .image-ikra
            img(src="/ikra.svg")
  .grid-item
    .banka.items-center.flex
      img(:src="balanceImg" v-if="idx < 10")
.hr(v-if="countUsers !== idx")
</template>

<style scoped lang="scss">
.item-user {
  display: grid;
  grid-template-columns: 7px 40px calc(100% - 40px - 7px - 40px - 10px - 16px) 40px; /* задает размер каждой колонки */
  gap: 8px; /* зазор между блоками */
  width: 100%;
}

.grid-item {
  display: flex; /* делает каждый блок flex-контейнером */
  align-items: center; /* вертикальное выравнивание */
  justify-content: center; /* горизонтальное выравнивание */
  text-align: center;
  padding: 10px 0;
}


.number {
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.user-data {
  width: 100%;
  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img{
      width: 100%;

    }
  }

  .text-data {
    text-align: left;
    .full-name {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .balance-text {
      font-size: 12px;
      font-weight: 600;
      color: #fff;
    }
    .image-ikra {
      width: 14px;
      margin-left: 2px;

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
    left: 0;
    top: 0;
    border: 1px solid rgb(255, 255, 255) !important;
  }
}

.banka {
  width: 40px;
  text-align: center;

  img {
    width: 40px;
    height: 40px;
  }
}



.left {
  width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.right {
  width: 20%;
}

</style>
