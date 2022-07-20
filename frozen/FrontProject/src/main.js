import Main from "./controller/main"
import Context from './context'

let context = new Context()
let app = new Main()
let root = document.createElement("div")
document.body.appendChild(root)
app.$mount(root)
app.setContext(context)