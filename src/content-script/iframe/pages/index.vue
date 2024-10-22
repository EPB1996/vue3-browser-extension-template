<script setup lang="ts">

import { useAppStore } from '@/stores/app.store'

const store = useAppStore()

const urlInformation = ref<URL | null>(null)
const whozUserId = computed(() => store.whozUserId)
const cvGeneratorUrl = computed(() => store.cvGeneratorUrl)

const showContentScript = computed(() => store.showContentScript)

onBeforeMount(() => {
  store.reloadSavedOptions()
})


onMounted(() => {
  // when page reload 
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      urlInformation.value = new URL(tabs[0].url!.toString())
    }
  )

  // when switching between tabs to reactivate in case of reanimation needed
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      urlInformation.value = new URL(tab.url!.toString())
    })
  })

  // when navigating to the profile page inside the WHOZ application
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
  const match = newValue.pathname.match(/^\/workspace\/([a-f0-9]{24})\/personal\/your\/profile$/);
  if (match) {
    store.setWhozUserId(match[1]);
  } else {
    store.setWhozUserId("");
  }
})
</script>


<template>
  <div v-if="showContentScript.active">
    <div v-if="whozUserId" class="wrap-text">
      <!-- <p>URL Information: {{ urlInformation }}</p> -->

      <p>This is the extracted ID: <strong>{{ whozUserId }}</strong></p>
      <p>The idea will be to call another application with this id such that it can be processed.</p>
      <a class="btn btn-primary" :href="cvGeneratorUrl" target="_blank">CV Generator</a>
    </div>
  </div>
</template>

<style scoped>
.wrap-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  padding: 5px;
  width: 100%;
  height: 100%;
  white-space: initial;
  word-wrap: break-word;
}
</style>
