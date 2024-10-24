<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    isContentScript: {
        type: boolean,
        default: false
    };
}>();

const displayName = __DISPLAY_NAME__

</script>

<template>
    <header aria-label="Site Header" class="bg-gray-50">
        <div class="flex items-center justify-between p-2">
            <h1 class="text-2xl flex-4">
                {{ displayName }}
            </h1>
            <img v-if="!props.isContentScript" class="logo" src="@/assets/images/logo_with_name.png" alt="DevoTeam logo" />
        </div>
    </header>
</template>
<style lang="scss" scoped>
.logo {
    width: 250px;
    height: auto;
}
</style>
