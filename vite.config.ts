import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005, // Optionnel : change le port si tu veux (ex: 3000 au lieu de 5173)
  }
});