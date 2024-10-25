<script setup lang="ts"></script>

<template>
  <Header :is-content-script="false"></Header>
  <div class="m-2">
    <RouterView></RouterView>
  </div>
  <Footer :is-content-script="false" />
</template>

<style scoped></style>