<script setup lang="ts">

import { useAppStore } from '@/stores/app.store'

const store = useAppStore()

const urlInformation = ref<URL | null>(null)
const currentUrl = computed(() => store.currentURL)
const showContentScript = computed(() => store.showContentScript)

onBeforeMount(() => {
  store.reloadSavedOptions()
})


onMounted(() => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      urlInformation.value = new URL(tabs[0].url!.toString())
    }
  )

  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      urlInformation.value = new URL(tab.url!.toString())
    })
  })

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      urlInformation.value = new URL(changeInfo.url);
    }
  });
})


watch(urlInformation, (newValue) => {
  if (!newValue) {
    return;
  }
  store.setCurrentURL(newValue.href);
})
</script>


<template>
  <div v-if="showContentScript.active" class="content-script-container">
    <div class="expandable">
      <div v-if="!currentUrl" class="wrap-text">
        <p>
          Current URL could not be determinded.
        </p>
      </div>
      <div v-else class="wrap-text">
        <!-- <p>URL Information: {{ urlInformation }}</p> -->

        <p>This is the extracted ID: <strong>{{ currentUrl }}</strong></p>
        <p>The idea will be to call another application with this id such that it can be processed.</p>
      </div>
    </div>
    <!--  <div class="floating-icon">
      🔍
      <p class="ps-5">
        Extension
      </p>
    </div> -->
  </div>
</template>

<style scoped>
.content-script-container {

  padding: 5px;
  color: #000;

}

.wrap-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  padding: 5px;
  white-space: initial;
  word-wrap: break-word;
}
</style>
