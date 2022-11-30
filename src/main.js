import { ViteSSG } from './vite-ssg'
/*
import { createApp } from 'vue'
*/
import App from './App.vue'
import routes from '~pages'

/*
import { createRouter, createWebHistory } from 'vue-router'
*/

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


/*
const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App).use(router).use(vuetify).mount('#app')
*/

console.log(routes)


export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    { routes, base: '', },
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
      app.use(vuetify)
    }
)