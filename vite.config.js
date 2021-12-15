import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => {
  const preactAlias = command === "build"
    ? [
      { find: "react", replacement: "preact/compat" },
      { find: "react-dom", replacement: "preact/compat" },
      { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" }
    ]
    : []

  return {
    resolve: {
      alias: [
        { find: "~", replacement: "/src" },
        ...preactAlias
      ]
    },
    plugins: [
      react(),
      VitePWA,
    ],
    build: {
      target: "esnext"
    }
  }
})
