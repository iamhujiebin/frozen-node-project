// import {createBrowserHistory, createHashHistory} from "history"
import {createHashHistory} from "history"
import {unstable_HistoryRouter as HistoryRouter} from "react-router-dom"

const history = createHashHistory() // 前端路由用hash,后端路由用Browser

export {HistoryRouter, history}