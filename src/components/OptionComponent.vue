<script setup lang="ts">
import { useOptionStore } from '@/stores/option.store'

const props = defineProps({
  parentSettingKey: String as PropType<string>,
  settingKey: String as PropType<string>,
  setting: Object as PropType<any>,
  disabled: Boolean,
})

const localSetting = computed(() => props.setting)

const store = useOptionStore()

const toggleOption = () => {
  store.toggleSetting(
    props.parentSettingKey!,
    props.settingKey!,
    localSetting.value
  )
}

const selectOption = (value: string) => {
  localSetting.value.selectedOption = value
  toggleOption()
}
</script>
<template>
  <div class="py-1" :class="{ 'opacity-50 pointer-events-none': disabled }">
    <div class="flex justify-between">
      <p class="font-bold"><!-- {{ setting?.title }} --></p>
      <p v-if="disabled">Disabled</p>
    </div>

    <div
      v-if="localSetting.type === 'selection'"
      class="flex justify-between flex-row items-center ps-2"
    >
      <div>
        <p class="text-gray-500">
          {{ localSetting?.description }}
        </p>
      </div>
      <div class="pt-1">
        <select
          v-model="localSetting.selectedOption"
          :disabled="disabled"
          @change="toggleOption"
        >
          <option
            v-for="selection in localSetting.options"
            :key="selection.key"
            :value="selection.value"
          >
            {{ selection.label }}
          </option>
        </select>
      </div>
    </div>

    <div
      v-if="localSetting.type === 'selection-btn'"
      class="ps-2 flex flex-col"
    >
      <div>
        <p class="text-gray-500">
          {{ localSetting?.description }}
        </p>
      </div>
      <div class="button-group pt-1">
        <button
          v-for="selection in localSetting.options"
          :key="selection.key"
          :value="selection.value"
          :disabled="disabled"
          @click="selectOption(selection.value)"
          :class="{ active: localSetting.selectedOption === selection.value }"
          class="option-button btn btn-outline"
        >
          {{ selection.label }}
        </button>
      </div>
    </div>
    <div
      v-if="localSetting.type === 'switch'"
      class="flex justify-between flex-row items-center ps-2"
    >
      <div>
        <p class="text-gray-500">
          {{ localSetting?.description }}
        </p>
      </div>
      <div>
        <input
          type="checkbox"
          class="hidden"
          :id="localSetting?.title"
          v-model="localSetting.active"
          :disabled="disabled"
          @change="toggleOption"
        />
        <label
          :for="localSetting?.title"
          class="flex items-center w-10 h-6 rounded-full bg-gray-400 cursor-pointer relative"
        >
          <span
            class="w-4 h-4 ml-1 bg-white rounded-full shadow inset-y-0 left-0 transition-transform duration-300 ease-in-out"
          ></span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:checked + label span {
  transform: translateX(100%);
  background-color: #34d399;
}

input:checked + label {
  background-color: #10b981;
}

.opacity-50 {
  opacity: 0.5;
}

.pointer-events-none {
  pointer-events: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.option-button {
  flex: 1;
  margin: 0 5px;
}

.option-button.active {
  background-color: #10b981;
  /* Green background for active button */
  color: white;
  border-color: #10b981;
}

.option-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.option-button:not(:last-child) {
  margin-right: 10px;
}
</style>
