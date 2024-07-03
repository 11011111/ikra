<script setup>

import AppHeaderBlock from "components/AppHeaderBlock.vue";
</script>

<template lang="pug">
.custom-page
.row.justify-start
  AppHeaderBlock.z-index-priority.relative-position(
    img="🎁"
    title="Exchange"
    text="Информация о розыгрышах призов"
  )
</template>

<style scoped lang="scss">

</style>
