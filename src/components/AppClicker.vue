<script setup>

</script>

<template lang="pug">
.button
  img(src="~/src/assets/banka.svg")
</template>

<style scoped lang="scss">
.button {
  border-radius: 50%;
  cursor: pointer;


  img {
    border-radius: 50%;
    border: 8px solid rgba(255, 142, 9, 0.65);
  }

  img:active {
    border: 8px solid rgb(255, 142, 7);
  }

}
</style>
