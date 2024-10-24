import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import options from './options.json'

export const useAppStore = defineStore('app', () => {
  const currentURL = useStorage('whozUserId', '')
  const showContentScript = ref(options.showContentScript)

  // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
  // See https://developer.chrome.com/docs/extensions/reference/api/storage

  const setCurrentURL = (value: string) => {
    currentURL.value = value
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
        chrome.storage.sync.set({ showContentScript: option })
        break
    }
  }

  return {
    currentURL,
    setCurrentURL,
    showContentScript,
    reloadSavedOptions,
    toogleOptions,
  }
})
