import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  
  server: {
    proxy: {
      "/greek-admin": {
        target: "http://127.0.0.1:8000",  // Django
        changeOrigin: true,
      },
       "/static": {
        target: "http://127.0.0.1:8000",  // Django static files
        changeOrigin: true,
      },
      "/media": {
        target: "http://127.0.0.1:8000",  // если картинки в /media
        changeOrigin: true,
      },
    },
  },


   
})
