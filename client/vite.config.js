import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url'; // Node.js থেকে দুটি নতুন helper ইম্পোর্ট করা হচ্ছে

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' কে 'src' ফোল্ডারের সাথে যুক্ত করার জন্য আধুনিক এবং সঠিক পদ্ধতি
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});