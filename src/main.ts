import { createElement } from "react"
import { render } from "react-dom"
import { App } from "./pages"

import "./style.css"

// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
//   onNeedRefresh() {},
//   onOfflineReady() {},
// })

const container = document.getElementById("react-app") as HTMLElement

render(createElement(App), container)
