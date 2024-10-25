<script setup lang="ts">
import ArrowBack from '~icons/mdi/arrow-left'
import { useOptionStore } from '@/stores/option.store'

const store = useOptionStore()
const allSettings = computed(() => store.allSettings)

onBeforeMount(() => {
  store.reloadSavedOptions()
})

</script>

<template>
  <div class="flex justify-between pe-2 pb-2">
    <div>
      <div v-if="$router.currentRoute.value.name !== 'popup' && $router.options.history.state.back"
        class="btn-outline  text-gray-800 font-bold py-2 px-2 rounded inline-flex " @click="$router.back">
        <ArrowBack />
        <span>{{ $router.options.history.state.back }}</span>
      </div>
    </div>
    <h1 class="t text-lg font-bold">Options</h1>
  </div>

  <div class="flex justify-end pb-2">
    <button class=" btn-outline  text-gray-800 font-bold py-2 px-2 rounded inline-flex "
      @click="store.resetSyncSettings">Reset synced settings</button>


  </div>
  <div v-for="(parentSetting, parentSettingKey) in allSettings" :key="parentSettingKey" class="mb-2">
    <div class="url-display">
      <h4 class="text-lg font-bold">{{ parentSetting.title }}</h4>
      <div v-for="(setting, settingKey) in parentSetting.options" :key="settingKey" class="mb-2">
        <OptionComponent :parent-setting-key="parentSettingKey" :setting-key="settingKey" :setting="setting" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.url-display {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
