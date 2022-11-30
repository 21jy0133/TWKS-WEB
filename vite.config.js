import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from 'vite-plugin-pages'
import { viteSingleFile } from "vite-plugin-singlefile"
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue(),Pages(),viteSingleFile(),vuetify({ autoImport: true }),],
  ssr: {
		noExternal: ['vuetify']
	},
  resolve: {
    alias: {
      // alias a path to a fs directory
      // the key must start and end with a slash
      '@/': path.join(__dirname, 'src/')
    }
  }
})