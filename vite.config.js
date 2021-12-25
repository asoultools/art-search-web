import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

process.env.VITE_APP_VERSION = JSON.stringify(process.env.npm_package_version).replace(/(^"|"$)/g, "")

console.log(global.process.env.VITE_APP_VERSION)

export default defineConfig(({}) => {
  return {
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          cacheId: "pic-asoul-fan-cache",
          runtimeCaching: [],
        },
      }),
    ],
  }
})
