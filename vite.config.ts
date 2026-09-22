import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/HUGO-Hematobio-Prod-V0.1/',

  server: {
    port: 3005,
  },
});