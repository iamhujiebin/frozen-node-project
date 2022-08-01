import { Route, Routes } from "react-router-dom"

import Login from '@/pages/Login'
import CMSLayout from '@/pages/Layout'
import { AuthRoute } from "./components/AuthRoute"
import Home from "@/pages/Home"
import Article from "@/pages/Article"
import Publish from "@/pages/Publish"
import { HistoryRouter, history } from '@/utils'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <AuthRoute>
              <CMSLayout />
            </AuthRoute>
          } >
            {/* 二级路由配置 */}
            <Route index element={<Home />} />
            <Route path='article' element={<Article />} />
            <Route path='publish' element={<Publish />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App