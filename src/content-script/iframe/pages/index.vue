<script setup lang="ts">
const urlInformation = ref<URL | null>(null)
const id = ref<string | null>(null);
const cvGeneratorUrl = computed(() => {
  if (!id.value) {
    return '';
  }
  return `https://www.example.com/cv-generator/${id.value}`;
})


onMounted(() => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, async (tab) => {
      urlInformation.value = new URL(tab.url!.toString())
    })
  })

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      urlInformation.value = new URL(tabs[0].url!.toString())
      const match = urlInformation.value.pathname.match(/^\/workspace\/([a-f0-9]{24})\/personal\/your\/profile$/);
      if (match) {
        id.value = match[1];
      }
    }
  )
})


</script>

<template>
  <div class="wrap-text">
    <!-- <p>URL Information: {{ urlInformation }}</p> -->

    <p>This is the extracted ID: <strong>{{ id }}</strong></p>
    <p>The idea will be to call another application with this id such that it can be processed.</p>
    <a class="btn btn-primary" :href="cvGeneratorUrl" target="_blank">CV Generator</a>
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
