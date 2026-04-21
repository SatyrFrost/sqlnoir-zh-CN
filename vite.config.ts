import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',   // <-- root deploy on simple hosting
  plugins: [react()],
});