import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // alias a path to a fs directory
      // the key must start and end with a slash
      '@/': path.join(__dirname, 'src/')
    }
  }
})