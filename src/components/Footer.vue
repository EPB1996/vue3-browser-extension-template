<script setup lang="ts">
import SettingsIcon from '~icons/mdi/cog'
import { defineProps } from 'vue';

const props = defineProps<{
    isContentScript: {
        type: boolean,
        default: false
    };
}>();

const version = __VERSION__

</script>

<template>
    <footer style="width: 100%;" aria-label="Site Footer" class="bg-gray-50 ">
        <div class="flex flex-row justify-between p-2">
            <RouterLink v-if="!isContentScript" class="underline" to="/common/about">
                About
            </RouterLink>
            <p>Version: {{ version }}</p>
            <RouterLink v-if="!isContentScript" class="justify-self-end" to="/options">
                <SettingsIcon />
            </RouterLink>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
.logo {
    width: 250px;
    height: auto;
}
</style>
