import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const currentURL = useStorage('currentURL', '')

    // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
    // See https://developer.chrome.com/docs/extensions/reference/api/storage

    const setCurrentURL = (value: string) => {
        currentURL.value = value
    }

    return {
        currentURL,
        setCurrentURL,
    }
})
