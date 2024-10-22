<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
const version = __VERSION__
const store = useAppStore()
const whozUserId = computed(() => store.whozUserId)
const cvGeneratorUrl = computed(() => store.cvGeneratorUrl)

onBeforeMount(() => {
  store.reloadSavedOptions()
})
</script>

<template>
  <div class="text-center m-4 flex flex-col gap-y-2">
    <div v-if="whozUserId" class="wrap-text">
      <!-- <p>URL Information: {{ urlInformation }}</p> -->

      <p>This is the extracted ID: <strong>{{ whozUserId }}</strong></p>
      <p>The idea will be to call another application with this id such that it can be processed.</p>
      <a class="btn btn-primary" :href="cvGeneratorUrl" target="_blank">CV Generator</a>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md bg-blue-500 text-white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
