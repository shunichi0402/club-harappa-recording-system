import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // 追加

const pinia = createPinia() // 追加

createApp(App).use(router).use(pinia).mount('#app') // 変更
