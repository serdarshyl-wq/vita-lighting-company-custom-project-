import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    obfuscatorPlugin({
      // Sadece src klasöründeki kodlarımızı obfuske et
      include: ['src/**/*.jsx', 'src/**/*.js'],
      exclude: [/node_modules/],
      // Performans için sadece üretim derlemesi (build) aşamasında uygula
      apply: 'build',
      debugger: true,
      options: {
        compact: true, // Şifrelenmiş kodu tek satırda sıkıştırır
        controlFlowFlattening: false, // İstenildiği gibi devasa "while/switch/case" mekanizmaları kapalı
        deadCodeInjection: false,
        debugProtection: true, // Açık devtools yakalayarak kodu kitler
        disableConsoleOutput: true, // Tarayıcı konsol loglarını gizler
        identifierNamesGenerator: 'hexadecimal', // Değişken ve fonksiyon isimlerini 0x1a2b... formatına çevirir
        renameGlobals: false,
        stringArray: true, // Bütün metin dizilerini saklar
        stringArrayEncoding: ['base64'], // Metinleri base64 ile kilitler
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }
    })
  ],
  build: {
    sourcemap: false, // Kaynak kod haritalarını kapattık ki React JSX dosyaları görülmesin
    minify: 'terser',
  }
})
