import { render } from "react-dom"
import { App } from "./app"

import "./style.css"

const container = document.getElementById("react-app") as HTMLElement

render(<App />, container)
