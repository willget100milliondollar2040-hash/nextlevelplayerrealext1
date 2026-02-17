
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Legacy fallback so existing `API_KEY=` still works in local `.env`.
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'development'),
    },
    server: {
      port: 5173, // Cố định cổng để tránh lỗi redirect
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false
    }
  };
});
