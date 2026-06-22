import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primeuix/themes/aura'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'primeicons/primeicons.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark', cssLayer: false },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
// Legacy user/role screens are incrementally migrated; keep their renderer active.
app.use(ElementPlus)

app.mount('#app')
