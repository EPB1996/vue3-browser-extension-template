<script setup lang="ts">

</script>

<template>
  <Header :is-content-script="false" />
  <div class="m-2">
    <RouterView />
  </div>
  <Footer :is-content-script="true" style="bottom: 0px; position: fixed;" />
</template>

<style scoped></style>
