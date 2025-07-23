import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Set the base path for GitHub Pages deployment
  // When deploying under a repository subdirectory, Vite needs to know the
  // correct base path so that asset URLs are resolved properly. GitHub Pages
  // serves the site from `/GestioneTickets/`, hence we set the base
  // accordingly. For local development the leading slash works equally well.
  base: '/GestioneTickets/',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
