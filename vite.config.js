import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'


process.env.VITE_APP_VERSION = JSON.stringify(process.env.npm_package_version)
  .replace(/(^"|"$)/g, '')

console.log(process.env.VITE_APP_VERSION)

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
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          cacheId: "pic-asoul-fan-cache",
          runtimeCaching: []
        },
      }),
    ]
  }
})
