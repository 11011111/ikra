<script setup>

const props = defineProps({
  img: String,
  title: String,
  text: String
})
</script>

<template lang="pug">
.row.column.blur-block
  p.icon {{ img }}
  span.title.text-center {{ title }}
  span.text.text-center {{ text }}

</template>

<style scoped lang="scss">
.blur-block {
  background: rgba(255, 255, 255, 5%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(5.9px);
  padding: 20px 30px;
  width: 90%;
  margin: 5px auto 5px;

  .icon {
    font-size: 100px;
    display: block;
    text-align: center;
    margin: 0 0 30px 0;
    padding-top: 30px;
    line-height: 45px;
  }
  .title{
    display: block;
    font-size: 24px;
    font-weight: bold;
  }
  .text {
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-top: 10px;
  }
}
</style>
