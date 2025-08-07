import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url'; // আধুনিক ESM মডিউলের জন্য helper

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' চিহ্নটিকে এখন থেকে 'src' ফোল্ডারের শর্টকাট হিসেবে ব্যবহার করা হবে
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});