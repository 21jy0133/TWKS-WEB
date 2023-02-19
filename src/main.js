import { createApp } from 'vue'

import App from './App.vue'
import routes from '~pages'


import {createRouter, createWebHashHistory } from 'vue-router'


// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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

import VueTimepicker from 'vue3-timepicker';
import 'vue3-timepicker/dist/VueTimepicker.css'


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
})

console.log(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

// register globally (or you can do it locally)
app.component('v-chart', ECharts)

app.component('Datepicker', Datepicker)

app.use(router).use(vuetify).use(VueViewer).mount('#app')


