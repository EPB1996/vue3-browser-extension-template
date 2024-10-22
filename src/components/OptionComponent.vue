<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'

const props = defineProps({
    option: Object as PropType<any>,
    disabled: Boolean,
})

const store = useAppStore()

const toggleOptions = () => {
    store.toogleOptions(props.option)
}
</script>
<template>
    <div class="p-2" :class="{ 'opacity-50 pointer-events-none': disabled }">
        <div class="flex justify-between">
            <p class="text-sm font-bold">{{ option?.title }}</p>
            <p class="text-sm" v-if="disabled">
                Disabled
            </p>
        </div>

        <div class="flex justify-between items-center ps-2">
            <div>
                <p class="text-sm text-gray-500">
                    {{ option?.description }}
                </p>
            </div>
            <div>
                <input type="checkbox" class="hidden" :id="option?.title" :v-model="option?.active"
                    :checked="option?.active" :disabled="disabled" @change="toggleOptions" />
                <label :for="option?.title"
                    class="flex items-center w-10 h-6 rounded-full bg-gray-400 cursor-pointer relative">
                    <span
                        class="w-4 h-4 ml-1 bg-white rounded-full shadow inset-y-0 left-0 transition-transform duration-300 ease-in-out"></span>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
input:checked+label span {
    transform: translateX(100%);
    background-color: #34d399;
}

input:checked+label {
    background-color: #10b981;
}

.opacity-50 {
    opacity: 0.5;
}

.pointer-events-none {
    pointer-events: none;
}
</style>
