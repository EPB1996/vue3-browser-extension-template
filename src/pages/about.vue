<script setup lang="ts">
import ArrowBack from '~icons/mdi/arrow-left'
</script>

<template>
  <div class="flex justify-between pe-2 pb-2">
    <div>
      <div
        v-if="
          $router.currentRoute.value.name !== 'popup' &&
          $router.options.history.state.back
        "
        class="btn-outline text-gray-800 font-bold py-2 px-2 rounded inline-flex"
        @click="$router.back"
      >
        <ArrowBack />
        <span>{{ $router.options.history.state.back }}</span>
      </div>
    </div>
    <h1 class="t text-lg font-bold">About</h1>
  </div>

  <Changelog />
</template>

<style scoped></style>
