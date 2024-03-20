import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
      ],
      dts: 'src/vite/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, './src/locales/**')]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/locales': path.resolve(__dirname, './src/locales'),
    },
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  server: {
    host: 'localhost',
    port: 9527,
    strictPort: true,
    open: true,
    // proxy: {
    //   '^/api': {
    //     target: 'http://localhost:3001/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  base: './',
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
        @import "@/assets/normalize.scss";`,
      }
    }
  }
})
