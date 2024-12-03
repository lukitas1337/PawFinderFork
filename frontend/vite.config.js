import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react-leaflet', 'leaflet', 'react', 'react-dom'],
    alias: {
      'react-leaflet': 'react-leaflet/dist/react-leaflet.js',
      'leaflet': 'leaflet/dist/leaflet.js'
    }
  }
})
