import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
import App from './app.vue'
import routes from '~pages'
import '../../assets/base.scss'
import './index.scss'

routes.push({
  path: '/',
  redirect: '/iframe',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

createApp(App).use(router).use(createPinia()).mount('#app')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
