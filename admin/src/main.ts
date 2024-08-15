import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(Particles, {
  init: async (engine: any) => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadFull(engine) // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
  }
})
app.mount('#app')
