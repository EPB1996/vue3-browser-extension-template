<script setup lang="ts">

</script>

<template>
  <div style=" height: 100%; ">
    <Header :is-content-script="true" />
    <RouterView style="" />
    <Footer :is-content-script="true" style="bottom: 0px; position: fixed;" />
  </div>
</template>

<style scoped></style>
