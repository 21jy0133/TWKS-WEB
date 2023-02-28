import { createApp } from 'vue'

import App from './App.vue'
import routes from '~pages'
import {reactive} from 'vue'

import {createRouter, createWebHashHistory } from 'vue-router'


// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css' 

import ECharts from 'vue-echarts'
import { use } from "echarts/core"

// import ECharts modules manually to reduce bundle size
import {  CanvasRenderer} from 'echarts/renderers'

import {  TitleComponent} from 'echarts/components'
import {  LineChart} from 'echarts/charts'
import {  LegendComponent} from 'echarts/components'
import { ToolboxComponent} from 'echarts/components'

import {  BarChart} from 'echarts/charts'
import {  GridComponent,  TooltipComponent} from 'echarts/components'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'


import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import VueElementLoading from "vue-element-loading";

//import VueTimepicker from 'vue3-timepicker';
//import 'vue3-timepicker/dist/VueTimepicker.css'

import store from "./store";


use([
  ToolboxComponent,
  LegendComponent,
  LineChart,
  TitleComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

console.log(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const noAuthRequired = !to.meta.requiresAuth && to.meta.requiresAuth !=null

  console.log('noAuthRequired', noAuthRequired, to.meta.requiresAuth)

  if (!noAuthRequired && !store.state.auth.status.loggedIn) {
    next('/login');
  } else {
    next();
  }
});

const app = createApp(App)

app.config.globalProperties.$loading = reactive({ active: false })


app.use(store)

// register globally (or you can do it locally)
app.component('v-chart', ECharts)


app.component("VueElementLoading", VueElementLoading);

app.component('Datepicker', Datepicker)

app.use(router).use(vuetify).use(VueViewer).mount('#app')


