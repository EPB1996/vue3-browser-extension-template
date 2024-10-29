<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <Header :is-content-script="false" />
    <div class="content">
      <RouterView />
    </div>
    <Footer :is-content-script="true" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex: 1;
  margin-top: 65px;
  /* Adjust based on header height */
  margin-bottom: 50px;
  /* Adjust based on footer height */
  overflow-y: auto;

  padding: 10px;
  /* Optional padding */
}
</style>
