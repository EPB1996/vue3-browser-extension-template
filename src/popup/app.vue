<script setup lang="ts">

import SettingsIcon from '~icons/mdi/cog'
import ArrowBack from '~icons/mdi/arrow-left'
const version = __VERSION__
const displayName = __DISPLAY_NAME__

</script>

<template>
  <Header />
  <div v-if="$router.currentRoute.value.name !== 'popup'" class="btn ml-4 mt-4" @click="$router.back">
    <ArrowBack />
  </div>
  <RouterView></RouterView>
  <Footer />
</template>

<style scoped></style>