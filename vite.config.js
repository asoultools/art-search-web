import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ }) => {
  return {
    resolve: {
      alias: [
        { find: "~", replacement: "/src" },
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
      ]
    },
    plugins: [
      react()
    ],
    build: {
      target: "esnext"
    }
  }
})
