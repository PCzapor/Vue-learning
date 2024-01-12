import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDroplet } from '@fortawesome/free-solid-svg-icons/faDroplet'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App).component('fa', FontAwesomeIcon)
export const instnce = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 100000
})
library.add(faDroplet)
app.use(createPinia())
app.use(router)

app.mount('#app')
