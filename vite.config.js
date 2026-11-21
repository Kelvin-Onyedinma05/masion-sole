import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    allowedHosts: ['pv-c60f7e190864-18fb0768-2e39-4583-9427-53ceed986cbe.style.dev']
  },
  preview: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    allowedHosts: ['pv-c60f7e190864-18fb0768-2e39-4583-9427-53ceed986cbe.style.dev']
  }
})
