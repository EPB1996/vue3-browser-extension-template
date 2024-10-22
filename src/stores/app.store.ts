import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const whozUserId = useStorage('whozUserId', '')
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

  return {
    whozUserId,
    setWhozUserId,
    cvGeneratorUrl
  }
})
