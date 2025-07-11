import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 🚀 Enable React support (Fast Refresh + JSX)
  plugins: [react()],

  // 🛠️ Resolve @ to /src for clean imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 💻 Dev server customization
  server: {
    port: 5173,      // Change this if 5173 is busy
    open: true,      // Auto-opens browser on npm run dev
  },

  // 📦 Build output configuration
  build: {
    outDir: 'dist',   // Folder for production build
    sourcemap: true,  // Helps debug production code
  },
});
