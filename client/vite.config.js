import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://safevoice-d9jr.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})
