<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    isContentScript: Boolean;
}>();

const displayName = __DISPLAY_NAME__

</script>

<template>
    <header aria-label="Site Header" class="bg-gray-50 fixed top-0 w-full z-50" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); height: 65px;">
        <div class="flex items-center justify-between p-2">
            <h1 class="text-2xl flex-4">
                {{ displayName }}
            </h1>
            <img v-if="!props.isContentScript" class="logo" src="@/assets/images/logo_with_name.png"
                alt="DevoTeam logo" />
        </div>
    </header>
</template>
<style lang="scss" scoped>
.logo {
    width: auto;
    height: 50px;
}
</style>
