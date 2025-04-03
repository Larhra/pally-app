import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Try a different port
    host: true, // Listen on all addresses
    open: true // Open browser automatically
    base: process.env.VITE_BASE_PATH "/pally-app"
  }
})