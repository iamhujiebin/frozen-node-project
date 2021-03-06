import { Route, Routes } from "react-router-dom"
import { AuthRoute } from "./components/AuthRoute"
import { HistoryRouter, history } from '@/utils'
import Loading from "./components/Loading"
import Article from "./pages/Article"
import Publish from "./pages/Publish"
import Home from "./pages/Home"
import Todo from "./pages/Todo"
import Camera from "./pages/Camera"

// 按需导入组件
// loading中的也可以实现一个简单组件
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('@/pages/Login'))
const CMSLayout = lazy(() => import('@/pages/Layout'))
// 下面这些二级路由没必要懒加载,用户体验有点不好
// const Article = lazy(() => import("@/pages/Article"))
// const Publish = lazy(() => import('@/pages/Publish'))
// const Home = lazy(() => import('@/pages/Home'))
// const Todo = lazy(() => import('@/pages/Todo'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={<Loading />}
      >
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
            <Route path='todo' element={<Todo />} />
            <Route path='camera' element={<Camera />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export default App