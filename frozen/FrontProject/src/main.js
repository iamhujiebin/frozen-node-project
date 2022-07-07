import Main from "./controller/main"

let app = new Main();
let root = document.createElement("div");
document.body.appendChild(root);
app.$mount(root);