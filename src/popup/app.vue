<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
import SettingsIcon from '~icons/mdi/cog'
import ArrowBack from '~icons/mdi/arrow-left'
const version = __VERSION__
const displayName = __DISPLAY_NAME__

</script>

<template>
  <header aria-label="Site Header" class="bg-gray-50">
    <div class="flex items-center justify-between p-2">
      <h1 class="text-2xl flex-4">{{ displayName }}</h1>
      <img class="logo" src="@/assets/logo.png" alt="DevoTeam logo" />
    </div>
  </header>
  <div v-if="$router.currentRoute.value.name !== 'popup'" class="btn ml-4 mt-4" @click="$router.back">
    <ArrowBack />
  </div>
  <RouterView></RouterView>

  <footer aria-label="Site Footer" class="bg-gray-50">
    <div class="flex flex-row justify-between p-2">
      <RouterLink class="underline" to="/common/about">
        About
      </RouterLink>
      <p>Version: {{ version }}</p>
      <RouterLink class="justify-self-end" to="/options">
        <SettingsIcon></SettingsIcon>
      </RouterLink>
    </div>
  </footer>
</template>

<style scoped></style>