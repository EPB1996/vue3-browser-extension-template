<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'

const store = useAppStore()
const showContentScript = computed(() => store.showContentScript)

onBeforeMount(() => {
  store.reloadSavedOptions()
})

</script>

<template>
  <div class="m-4 flex flex-col font-roboto divide-y">
    <div class="space-y-2">
      <p class="text-lg font-bold">
        Options
      </p>
      <OptionComponent :option="showContentScript" />
    </div>
  </div>
</template>

<style scoped>
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
