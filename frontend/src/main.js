import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './views/css/style.css'
// global bootstrap + theme
import 'bootstrap/dist/css/bootstrap.css'
import './styles/theme.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

