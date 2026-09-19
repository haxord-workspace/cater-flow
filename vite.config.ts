import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cater-flow/',
  server: {
    port: 5175,
    host: true
  }
});
