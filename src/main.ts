import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/style.scss'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'


createApp(App).use(store).use(router).use(FloatingVue, {
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: 'bottom'
    }
    }
}).mount('#app')
