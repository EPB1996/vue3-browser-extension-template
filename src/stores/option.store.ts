import { defineStore } from 'pinia'
import options from './options.json'

export const useOptionStore = defineStore('optionStore', () => {
    const allSettings = ref<{ [key: string]: any }>(options)

    const reloadSyncSettings = () => {
        chrome.storage.sync.get(['devoteam-extension-settings'], (result) => {
            allSettings.value = result['devoteam-extension-settings']
        })
    }

    const toggleSetting = (
        settingKey: string,
        optionKey: string,
        option: any
    ) => {
        allSettings.value[settingKey].options[optionKey] = option
        chrome.storage.sync.set({
            'devoteam-extension-settings': allSettings.value,
        })
    }

    const resetSyncSettings = () => {
        chrome.storage.sync.clear()
        chrome.storage.sync.set({
            'devoteam-extension-settings': options,
        })
        reloadSyncSettings()
    }

    return {
        allSettings,
        reloadSyncSettings,
        toggleSetting,
        resetSyncSettings,
    }
})
