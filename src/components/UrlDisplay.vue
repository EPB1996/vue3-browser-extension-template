<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'

const store = useAppStore()

const urlInformation = ref<URL | null>(null)
const currentUrl = computed(() => store.currentURL)
const urlComponents = ref<{
    protocol: string;
    host: string;
    pathname: string;
    searchParams: Record<string, string>;
    hash: string;
} | null>(null);



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

    chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
        if (changeInfo.url) {
            urlInformation.value = new URL(changeInfo.url)
        }
    })
})

const parseUrl = (url: string) => {
    try {
        const parsedUrl = new URL(url);
        const searchParams: Record<string, string> = {};
        parsedUrl.searchParams.forEach((value, key) => {
            searchParams[key] = value;
        });

        return {
            protocol: parsedUrl.protocol,
            host: parsedUrl.host,
            pathname: parsedUrl.pathname,
            searchParams,
            hash: parsedUrl.hash,
        };
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
};

watch(urlInformation, (newValue) => {
    if (!newValue) {
        return
    }
    store.setCurrentURL(newValue.href)
    urlComponents.value = parseUrl(newValue.href)
})

watch(currentUrl, (newValue) => {
    urlComponents.value = parseUrl(newValue)
})
</script>

<template>

    <div class="flex justify-start">
        <h1 class="text-lg">Url Component</h1>
    </div>
    <div class="url-display">
        <p class="wrappable-url  text-rose-500">{{ currentUrl }}</p>
        <div v-if="urlComponents">
            <table>
                <tbody>
                    <tr>
                        <td><strong>Protocol:</strong></td>
                        <td>{{ urlComponents.protocol }}</td>
                    </tr>
                    <tr>
                        <td><strong>Host:</strong></td>
                        <td>{{ urlComponents.host }}</td>
                    </tr>
                    <tr>
                        <td><strong>Pathname:</strong></td>
                        <td>{{ urlComponents.pathname }}</td>
                    </tr>
                    <tr>
                        <td><strong>Search Params:</strong></td>
                        <td>
                            <ul>
                                <li v-for="(value, key) in urlComponents.searchParams" :key="key">
                                    {{ key }}: {{ value }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Hash:</strong></td>
                        <td>{{ urlComponents.hash }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.url-display {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    width: 100%;
    margin: 0 auto;
}

.url-display p {
    margin: 5px 0;
}

.url-display .wrappable-url {
    word-wrap: break-word;
    white-space: normal;
}

.url-display table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
}

.url-display th,
.url-display td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    word-wrap: break-word;
    white-space: normal;
}

.url-display th {
    background-color: #f2f2f2;
}

.url-display ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.url-display li {
    margin: 5px 0;
}
</style>
