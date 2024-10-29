<script setup lang="ts">
import SettingsIcon from '~icons/mdi/cog'

defineProps<{
  isContentScript: boolean
}>()

const version = __VERSION__
</script>

<template>
  <footer
    aria-label="Site Footer"
    class="bg-gray-50 fixed bottom-0 w-full z-50"
    style="box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1)"
  >
    <div class="flex flex-row justify-between p-2">
      <div>
        <RouterLink
          v-if="!isContentScript"
          class="underline"
          to="/common/about"
        >
          About
        </RouterLink>
      </div>
      <p>Version: {{ version }}</p>
      <div>
        <RouterLink
          v-if="!isContentScript"
          class="justify-self-end"
          to="/options"
        >
          <SettingsIcon />
        </RouterLink>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.logo {
  width: 250px;
  height: auto;
}
</style>
