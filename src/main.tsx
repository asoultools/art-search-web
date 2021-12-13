import { render } from "preact"
import { App } from "./app"

import "./style.css"

const container = document.getElementById("preact-app") as HTMLElement

render(<App />, container)


