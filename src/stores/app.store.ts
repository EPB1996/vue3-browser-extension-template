import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import options from './options.json'

export const useAppStore = defineStore('app', () => {
  const whozUserId = useStorage('whozUserId', '')
  const showContentScript = ref(options.showContentScript)

  const cvGeneratorUrl = computed(() => {
    if (!whozUserId.value) {
      return ''
    }
    return `https://www.example.com/cv-generator/${whozUserId.value}`
  })

  // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
  // See https://developer.chrome.com/docs/extensions/reference/api/storage

  const setWhozUserId = (value: string) => {
    whozUserId.value = value
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
      if (changes[options.showContentScript.key]) {
        showContentScript.value =
          changes[options.showContentScript.key].newValue
      }
    }
  })

  const reloadSavedOptions = () => {
    chrome.storage.sync.get([options.showContentScript.key], (result) => {
      if (result[options.showContentScript.key])
        showContentScript.value = result[options.showContentScript.key]
    })
  }

  const toogleOptions = (option: {
    title: string
    description: string
    active: boolean
  }) => {
    option.active = !option.active
    switch (option.title) {
      case options.showContentScript.title:
        chrome.storage.sync.set({ showMappingAssistant: option })
        break
    }
  }

  return {
    whozUserId,
    setWhozUserId,
    showContentScript,
    reloadSavedOptions,
    toogleOptions,
    cvGeneratorUrl,
  }
})
